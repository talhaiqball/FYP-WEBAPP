import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import DeleteGroup from './DeleteGroup';

const IncompleteGroups = () => {

    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [incompleteGroups, setIncompleteGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Dummy data for incomplete groups
        const dummyIncompleteGroups = [
            { groupid: 'G1' },
            { groupid: 'G2' },
            { groupid: 'G3' }
        ];
        setIncompleteGroups(dummyIncompleteGroups);
    }, []);


    const handleViewGroupDetails = (groupid) => {
        // Handle viewing group details
        navigate(`/coordinator/ViewGroupDetails/`);
    };

    const handleDeleteGroup = (Group) => {
        setSelectedGroup(Group);
        setShowConfirmation(true);
    };

    const confirmDeleteGroup = () => {
        console.log("Deleting Group:", selectedGroup.groupid);
        setShowConfirmation(false);
        setSelectedGroup(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setSelectedGroup(null);
    };

    return (
        <div>
            <div className="row ">
                <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-gred text-center">
                    <h2><b>Incomplete Groups</b></h2>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive " >
                    <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Group ID</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ fontSize: '13px' }}>
                            {incompleteGroups.map(group => (
                                <tr key={group.groupid}>
                                    <td>{group.groupid}</td>
                                    <td>
                                        <span onClick={() => handleViewGroupDetails(group.groupid)} style={{ fontSize: 'small', color: '#0496FF', cursor: 'pointer', marginRight: '5px' }}>View Group</span>
                                        <span>|</span>
                                        <span onClick={() => handleDeleteGroup(group)} style={{ fontSize: 'small', color: 'red', cursor: 'pointer', marginLeft: '5px' }}>Delete</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <DeleteGroup
                show={showConfirmation}
                onHide={handleCancelDelete}
                onConfirm={confirmDeleteGroup}
                message={`Are you sure you want to delete this Group? <br/> ${selectedGroup ? selectedGroup.groupid : ''}`}
            />
        </div>
    );
};

export default IncompleteGroups;
