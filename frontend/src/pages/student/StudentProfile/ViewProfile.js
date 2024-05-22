import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { StudentContext } from '../../../context/StudentContext';

function ViewProfile() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const { userid } = useContext(StudentContext);
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        const fetchStudentInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getStudentInfo/${userid}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchStudentInfo();
    }, [userid]);

    const handleEdit = () => {
        navigate(`/student/EditProfile/${userid}`);
    }

    const handleGoBack = () => {
        navigate(`/student/Dashboard/${userid}`);
    };

    return (
        <div className='container'>
            <div className="shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-gred text-center">
                        <h2><b>View Profile</b></h2>
                    </div>
                    <div className="col-sm-3 mb-4 mt-3 text-end">
                        <button
                            className="btn-close"
                            onClick={handleGoBack}
                            style={{ marginRight: '1rem' }}
                        />
                    </div>
                </div>
                <div className='row'>
                    {student && (
                        <form style={{ paddingLeft: '50px' }}>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="name" className="col-form-label">Name</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="name" value={student.name} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="userid" className="col-form-label">User ID</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="userid" value={student.userid} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="program" className="col-form-label">Program<span style={{ color: 'red' }}>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="program" value={student.program} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="cgpa" className="col-form-label">CGPA<span style={{ color: 'red' }}>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="cgpa" value={student.CGPA} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className='col-sm-2'>
                                    <label htmlFor="interests">Interests<span style={{ color: 'red' }}>*</span></label>
                                </div>
                                <div className="col-sm-8">
                                    <textarea type="text" className="form-control form-control-sm p-2" id="interests" value={student.interests} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="skills" className="col-form-label">Skills</label>
                                </div>
                                <div className="col-sm-8">
                                    <textarea type="text" className="form-control form-control-sm p-2" id="skills" value={student.skills} disabled />
                                </div>
                            </div>
                            <div className='form-group row'>
                                <div className="col-sm-4 pt-2">
                                    <label htmlFor='freeslots'>Free Slots<span style={{ color: 'red' }}>*</span></label>
                                </div>
                                <div className="table-responsive pt-3">
                                    <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }}>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                {days.map((day, index) => (
                                                    <th key={index}>{day}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[1, 2, 3, 4, 5, 6].map((row, rowIndex) => (
                                                <tr key={rowIndex}>
                                                    <td>{row}</td>
                                                    {days.map((_, columnIndex) => {
                                                        const slot = student.freeslots[rowIndex] ? student.freeslots[rowIndex][columnIndex] : 0;
                                                        return (
                                                            <td key={columnIndex}>
                                                                <button
                                                                    className="btn btn-lg btn-custom"
                                                                    style={{ backgroundColor: slot ? '#0496FF' : 'transparent', borderColor: 'lightgray', height: '4vh', width: '4vw' }}
                                                                    disabled
                                                                >
                                                                </button>
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className='form-group'>
                                <button type="button" className="btn" style={{ backgroundColor: '#0496FF', color: 'white' }} onClick={handleEdit}>Edit</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;