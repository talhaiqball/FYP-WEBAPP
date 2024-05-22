import React, { useState, useEffect } from 'react';
import { PersonAddOutlined } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';
import AddSupervisor from './AddSupervisor';
import RemoveSupervisor from './RemoveSupervisor';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewSupervisors() {
    const [supervisorData, setsupervisorData] = useState([]);
    const [selectedSupervisor, setSelectedSupervisor] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAddPrompt, setShowAddPrompt] = useState(false);
    const [records, setRecords] = useState(supervisorData);
    const [noResultsFound, setNoResultsFound] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSupervisorsData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/viewAllSupervisors');
                setsupervisorData(response.data);
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching supervisors data:', error)
            }
        }

        fetchSupervisorsData();
    }, []);
    console.log(supervisorData)

    const handleViewProfile = (supervisor) => {
        navigate(`/coordinator/ViewSupervisorProfile`, { state: { supervisor } });
    };

    const handleDeleteSupervisor = (supervisor) => {
        setSelectedSupervisor(supervisor);
        setShowConfirmation(true);
    };

    const confirmDeleteSupervisor = async () => {
        try {
            await axios.delete(`http://localhost:3001/removeSupervisor/${selectedSupervisor.userid}`);
            setShowConfirmation(false);
            setSelectedSupervisor(null);
            const updatedData = supervisorData.filter(supervisor => supervisor.userid !== selectedSupervisor.userid);
            setsupervisorData(updatedData);
            setRecords(updatedData);
        } catch (error) {
            console.error('Error deleting supervisor', error);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setSelectedSupervisor(null);
    };

    const handleAddSupervisor = () => {
        setShowAddPrompt(true);
    };

    const handleCancelAdd = () => {
        setShowAddPrompt(false);
    };


    const handleConfirmAdd = () => {
        setShowAddPrompt(false);
    };

    function handleFilter(event) {
        const searchText = event.target.value;
        const newData = supervisorData.filter(row => {
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
                            <input className="form-control form-control-sm mr-sm-2" type="text" placeholder="Search Supervisor by ID" aria-label="Search" onChange={handleFilter} style={{ width: '100%' }} />
                        </form>
                    </div>

                    <div className="col-sm-5 mb-4 mt-2 text-center text-gred">
                        <h2><b>Supervisors</b></h2>
                    </div>
                    <div className="col-sm-3 mb-4 mt-2 text-gred text-end">
                        <div onClick={handleAddSupervisor}>
                            <PersonAddOutlined style={{ marginRight: '1rem', color: 'green', cursor: 'pointer' }} />
                        </div>
                    </div>
                </div>

                <div style={{ display: 'block', width: '100%', borderBottom: '1px solid grey' }}></div>

                <div className="row">
                    <div className="table-responsive " >
                        <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '13px' }}>
                                {noResultsFound ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-danger fs-5">No supervisor found with the provided ID.</td>
                                    </tr>
                                ) : (
                                    records.map((supervisor, index) => (
                                        <tr key={supervisor.userid}>
                                            <td>{index + 1}</td>
                                            <td>{supervisor.userid}</td>
                                            <td>{supervisor.name}</td>
                                            <td>{supervisor.email}</td>
                                            <td>
                                                <span onClick={() => handleViewProfile(supervisor)} style={{ fontSize: 'small', color: '#0496FF', cursor: 'pointer', marginRight: '5px' }}>View Profile</span>
                                                <span>|</span>
                                                <span onClick={() => handleDeleteSupervisor(supervisor)} style={{ fontSize: 'small', color: 'red', cursor: 'pointer', marginLeft: '5px' }}>Remove</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <RemoveSupervisor
                    show={showConfirmation}
                    onHide={handleCancelDelete}
                    onConfirm={confirmDeleteSupervisor}
                    message={`Are you sure you want to remove this supervisor? <br/> ${selectedSupervisor ? selectedSupervisor.name : ''} (${selectedSupervisor ? selectedSupervisor.email : ''})`}
                />
                <AddSupervisor
                    show={showAddPrompt}
                    onHide={handleCancelAdd}
                    onConfirm={handleConfirmAdd}
                />
            </div>

        </div>
    );
}

export default ViewSupervisors;
