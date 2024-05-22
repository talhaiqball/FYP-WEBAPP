import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import RemoveStudent from './RemoveStudent';
import axios from 'axios';

function ViewStudents() {
    const [studentData, setStudentData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [records, setRecords] = useState(studentData);
    const [noResultsFound, setNoResultsFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/viewAllStudents'); 
                setStudentData(response.data); 
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudentData();
    }, []);

    const handleViewProfile = (student) => {
        navigate(`/coordinator/ViewStudentProfile`, { state: { student } });
    };
       

    const handleDeleteStudent = (Student) => {
        setSelectedStudent(Student);
        setShowConfirmation(true);
    };

    const confirmDeleteStudent = async () => {
        try {
            await axios.delete(`http://localhost:3001/removeStudent/${selectedStudent.userid}`);
            console.log("Deleting Student:", selectedStudent.userid);
            setShowConfirmation(false);
            setSelectedStudent(null);
            const updatedData = studentData.filter(student => student.userid !== selectedStudent.userid);
            setStudentData(updatedData);
            setRecords(updatedData);
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setSelectedStudent(null);
    };

    function handleFilter(event) {
        const searchText = event.target.value;
        const newData = studentData.filter(row => {
            return row.userid.toString().includes(searchText);
        });
        setRecords(newData);

        if (newData.length === 0) {
            setNoResultsFound(true);
        } else {
            setNoResultsFound(false);
        }
    }

    return (
        <div className='conatiner'>
            <div className="shadow-lg p-3 mb-5 mt-5 bg-body rounded">
            <div className="row align-items-center">
                    <div className="col-sm-4 mb-4 text-gred">
                        <form className="form-inline">
                            <input className="form-control form-control-sm mr-sm-2" type="text" placeholder="Search Student by ID" aria-label="Search" onChange={handleFilter} style={{ width: '100%' }} />
                        </form>
                    </div>

                    <div className="col-sm-5 mb-4 mt-2 text-center text-gred">
                        <h2><b>Students List</b></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive " >
                        <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }}>
                            <thead>
                                <tr >
                                    <th>#</th>
                                    <th>Roll No</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Program</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '13px' }}>
                                {noResultsFound ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-danger fs-5">No student found with the provided roll number.</td>
                                    </tr>
                                ) : (
                                        records.map((student, index) => (
                                            <tr key={student.userid}>
                                                <td>{index + 1}</td>
                                                <td>{student.userid}</td>
                                                <td>{student.name}</td>
                                                <td>{student.email}</td>
                                                <td>{student.program}</td>
                                                <td>
                                                    <span onClick={() => handleViewProfile(student)} style={{ fontSize: 'small', color: '#0496FF', cursor: 'pointer', marginRight: '5px' }}>View Profile</span>
                                                    <span>|</span>
                                                    <span onClick={() => handleDeleteStudent(student)} style={{ fontSize: 'small', color: 'red', cursor: 'pointer', marginLeft: '5px' }}>Remove</span>
                                                </td>
                                            </tr>
                                        )))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <RemoveStudent
                    show={showConfirmation}
                    onHide={handleCancelDelete}
                    onConfirm={confirmDeleteStudent}
                    message={`Are you sure you want to remove this Student? <br/> ${selectedStudent ? selectedStudent.name : ''} (${selectedStudent ? selectedStudent.email : ''})`}
                />
            </div>
        </div>
    );
}

export default ViewStudents;