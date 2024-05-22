import React, { useState, useEffect } from 'react';
import { PersonAddOutlined } from '@mui/icons-material';
import Table from 'react-bootstrap/Table';
import AddPanelMember from './AddPanelMember';
import RemovePanelMember from './RemovePanelMember';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewPanelMembers = () => {
    const [panelMembersData, setPanelMembersData] = useState([]);
    const [selectedPanelMember, setSelectedPanelMember] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAddPrompt, setShowAddPrompt] = useState(false);
    const [records, setRecords] = useState(panelMembersData);
    const [noResultsFound, setNoResultsFound] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchPanelMembersData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/viewAllPanelMembers');
                setPanelMembersData(response.data);
                setRecords(response.data);
            } catch (error) {
                console.error('Error fetching panel members data:', error)
            }
        }

        fetchPanelMembersData();
    }, []);
    console.log(panelMembersData)

    const handleViewProfile = (panelMember) => {
        navigate(`/coordinator/ViewPanelMemberProfile`, { state: { panelMember } });
    };

    const handleDeletePanelMember = (panelMember) => {
        setSelectedPanelMember(panelMember);
        setShowConfirmation(true);
    };

    const confirmDeletePanelMember = async () => {
        try {
            await axios.delete(`http://localhost:3001/removePanelMember/${selectedPanelMember.userid}`);
            setShowConfirmation(false);
            setSelectedPanelMember(null);
            const updatedData = panelMembersData.filter(panelMember => panelMember.userid !== selectedPanelMember.userid);
            setPanelMembersData(updatedData);
            setRecords(updatedData);
        } catch (error) {
            console.error('Error deleting panel member', error);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setSelectedPanelMember(null);
    };

    const handleAddPanelMember = () => {
        setShowAddPrompt(true);
    };

    const handleCancelAdd = () => {
        setShowAddPrompt(false);
    };


    const handleConfirmAdd = () => {
        setShowAddPrompt(false);
    };

    function handleFilter(event) {
        const searchText = event.target.value.toLowerCase();

        const filteredRecords = panelMembersData.filter(panelMember => {
            return panelMember.domain.some(domain => domain.toLowerCase().includes(searchText));
        });

        setRecords(filteredRecords);
        setNoResultsFound(filteredRecords.length === 0);
    }

    return (
        <div className='conatiner'>
            <div className="shadow-lg p-3 mb-5 mt-5 bg-body rounded">
                <div className="row align-items-center">
                    <div className="col-sm-4 mb-4 text-gred">
                        <form className="form-inline">
                            <input className="form-control form-control-sm mr-sm-2" type="text" placeholder="Search Panel Member by Domain" aria-label="Search" onChange={handleFilter} style={{ width: '100%' }} />
                        </form>
                    </div>

                    <div className="col-sm-5 mb-4 mt-2 text-center text-gred">
                        <h2><b>Panel Members</b></h2>
                    </div>
                    <div className="col-sm-3 mb-4 text-gred text-end">
                        <div onClick={handleAddPanelMember}>
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
                                    <th>Domain</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: '13px' }}>
                                {noResultsFound ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-danger fs-5">No panel member found with the provided Domain.</td>
                                    </tr>
                                ) : (
                                    records.map((panelMember, index) => (
                                        <tr key={panelMember.userid}>
                                            <td>{index + 1}</td>
                                            <td>{panelMember.userid}</td>
                                            <td>{panelMember.name}</td>
                                            <td>{panelMember.email}</td>
                                            <td>{Array.isArray(panelMember.domain) ? panelMember.domain.join(', ') : panelMember.domain}</td>
                                            <td>
                                                <span onClick={() => handleViewProfile(panelMember)} style={{ fontSize: 'small', color: '#0496FF', cursor: 'pointer', marginRight: '5px' }}>View Profile</span>
                                                <span>|</span>
                                                <span onClick={() => handleDeletePanelMember(panelMember)} style={{ fontSize: 'small', color: 'red', cursor: 'pointer', marginLeft: '5px' }}>Remove</span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <RemovePanelMember
                    show={showConfirmation}
                    onHide={handleCancelDelete}
                    onConfirm={confirmDeletePanelMember}
                    message={`Are you sure you want to remove this panelMember? <br/> ${selectedPanelMember ? selectedPanelMember.name : ''} (${selectedPanelMember ? selectedPanelMember.email : ''})`}
                />
                <AddPanelMember
                    show={showAddPrompt}
                    onHide={handleCancelAdd}
                    onConfirm={handleConfirmAdd}
                />
            </div>
        </div>
    );
}

export default ViewPanelMembers;