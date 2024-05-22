import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { StudentContext } from '../../../../context/StudentContext';

const ViewGroupByLeader = () => {
    const { userid } = useContext(StudentContext);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const navigate = useNavigate();
    const [isLeader, setIsLeader] = useState(false);
    const initialGroup = {
        groupid: "1",
        title: "Dummy Project 1",
        domain: "Dummy Domain 1",
        supervisor: "Supervisor 1",
        members: ["Member 1", "Member 2", "Member 3, Member 2"]
    };
    const [group, setGroup] = useState(initialGroup);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSupervisorProfile = (supervisor) => {
        navigate(`/coordinator/ViewSupervisorProfile`, { state: { supervisor } });
    };

    useEffect(() => {
        // Assuming you retrieve the 'isLeader' value from localStorage or somewhere else
        const isLeaderValue = localStorage.getItem('isLeader');
        setIsLeader(isLeaderValue === 'true');
    }, []);

    return (
        <div className='container'>
            <div className='shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded'>
                <div className="row ">
                    <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-gred text-center">
                        <h2><b>Group Details</b></h2>
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
                    <form style={{ paddingLeft: '50px' }}>
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="groupid" className="col-form-label">Group ID</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm p-2" id="groupid" value={group?.groupid} disabled />
                            </div>
                        </div>
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="projectTitle" className="col-form-label">Project Title</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm p-2" id="projectTitle" name="title" value={group?.title} disabled />
                            </div>
                        </div>
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="groupDomain" className="col-form-label">Domain</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm p-2" id="groupDomain" name="domain" value={group?.domain} disabled />
                            </div>
                        </div>
                        <div className="form-group row pt-3">
                            <div className="col-md-2 pt-2">
                                <label htmlFor="supervisor" className="col-form-label">Supervisor</label>
                            </div>
                            <div className="col-md-8 pt-3">
                                <span className="btn-link" onClick={() => handleSupervisorProfile(group?.supervisor)}
                                    style={{ color: '#0496FF', cursor: 'pointer', textDecoration: 'none' }}
                                    title="View Profile">
                                    {group?.supervisor}
                                </span>
                            </div>
                        </div>

                        <div className="form-group row pt-3">
                            <div className="col-sm-4">
                                <label htmlFor="members" className="col-form-label">Group Members</label>
                            </div>

                            <div className='offset-sm-2'>
                                <p>Leader: {userid}</p>
                                {group?.members.map((member, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <span className="btn-link" onClick={() => handleSupervisorProfile(member)}
                                            style={{ color: '#0496FF', cursor: 'pointer', marginRight: '5px', textDecoration: 'none' }}
                                            title="View Profile">
                                            {member}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='form-group row pt-3'>
                            <div className="col-sm-2">
                                <label htmlFor='freeslots'>Free Slots</label>
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
                                                {[1, 2, 3, 4, 5, 6].map((slot, columnIndex) => (
                                                    <td key={columnIndex}>
                                                        <button
                                                            className="btn btn-lg btn-custom"
                                                            style={{ backgroundColor: '#0496FF', borderColor: 'lightgray', height: '4vh', width: '4vw' }}
                                                            disabled
                                                        >
                                                        </button>
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {isLeader && (
                                    <Link to={`/student/EditGroupByLeader`} className="btn btn-primary float-start">Edit</Link>
                                )}
                            </div>
                            <div className="col text-end">
                                {isLeader && (
                                    <Link to={`/student/SearchStudentByLeader`} className="btn btn-primary">Invite Member</Link>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ViewGroupByLeader;
