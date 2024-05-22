import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

function ViewSupervisorProfile() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const navigate = useNavigate();
    const location = useLocation();
    const supervisor = location.state.supervisor;
    const [slots, setSlots] = useState(supervisor.totalSupervisionSlots);

    const handleDecrease = async () => {
        const newSlots = Math.max(slots - 1, 0);
        setSlots(newSlots);
        await updateSlots(supervisor.userid, newSlots);
    };

    const handleIncrease = async () => {
        const newSlots = slots + 1;
        setSlots(newSlots);
        await updateSlots(supervisor.userid, newSlots);
    };

    const updateSlots = async (userid, slots) => {
        try {
            await axios.post('http://localhost:3001/addSupervisionSlots', { 
                userid, 
                slots
            });
        } catch (error) {
            console.error('Error updating supervision slots:', error);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
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
                    {supervisor && (
                        <form style={{ paddingLeft: '50px' }}>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="name" className="col-form-label">Name</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="name" value={supervisor.name} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="userid" className="col-form-label">User ID</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="userid" value={supervisor.userid} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="domain" className="col-form-label">Domain</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type='text' className="form-control form-control-sm p-2" id="domain" value={supervisor.domain} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="supervisionSlots" className="col-form-label">Total Supervision Slots</label>
                                </div>
                                <div className="col-sm-8 d-flex align-items-center">
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={handleDecrease}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm text-center mx-2"
                                        id="supervisionSlots"
                                        value={slots}
                                        readOnly
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary btn-sm"
                                        onClick={handleIncrease}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="availableSlots" className="col-form-label">Available Slots</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type='text' className="form-control form-control-sm p-2" id="availableSlots" value={supervisor.availableSlots} disabled />
                                </div>
                            </div>
                            <div className="form-group pt-3">
                                <div className='col-sm-8'>
                                    <label htmlFor="suggestedIdeas">Suggested Ideas</label>
                                </div>
                                {supervisor.ideas.map((idea, index) => (
                                    <div className='col-sm-8 offset-sm-2 pt-3' key={index}>
                                        <textarea className='form-control form-control-sm p-2' id={`suggestedIdeas${index + 1}`} name="suggestedIdeas" value={idea} disabled />
                                    </div>
                                ))}
                            </div>
                            <div className="form-group">
                                <div className='col-sm-auto pt-2'>
                                    <label htmlFor="previousProjects">Previous Projects</label>
                                </div>
                                {supervisor.recentProjects.map((project, index) => (
                                    <div className='col-sm-8 offset-sm-2 pt-3' key={index}>
                                        <textarea className='form-control  form-control-sm p-2' id={`previousProject${index + 1}`} name="previousProjects" value={project} disabled />
                                    </div>
                                ))}
                            </div>

                            <div className='form-group row'>
                                <div className="col-sm-4 pt-2">
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
                                                    {days.map((_, columnIndex) => {
                                                        const slot = supervisor.freeslots[rowIndex] ? supervisor.freeslots[rowIndex][columnIndex] : 0;
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
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewSupervisorProfile;