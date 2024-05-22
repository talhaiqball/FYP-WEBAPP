import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteFYPGroup from './DeleteFYPGroup';

const ViewFYPGroups = () => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGroupsData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/viewAllFYPGroups');
                setGroups(response.data);
            } catch (error) {
                console.error('Error fetching group data:', error);
            }
        };

        fetchGroupsData();
    }, []);

    useEffect(() => {
        if (selectedOption === "") {
            setFilteredGroups(groups);
        } else {
            const filtered = groups.filter(group => group.category === selectedOption);
            setFilteredGroups(filtered);
        }
    }, [selectedOption, groups]);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };

    const handleViewDetails = (group) => {
        navigate('/coordinator/ViewGroupDetails', {state: { group }});
    };

    const handleDeleteGroup = (group) => {
        setShowConfirmation(true);
        // If selectedGroup is already an array, append the new group
        if (Array.isArray(selectedGroup)) {
            setSelectedGroup([...selectedGroup, group]);
        } else {
            // Otherwise, set selectedGroup to an array containing only the new group
            setSelectedGroup([group]);
        }
    };


    const confirmDeleteGroup = async () => {
        try {
            // If selectedGroup is an array, delete each group
            if (Array.isArray(selectedGroup)) {
                const deleteRequests = selectedGroup.map(async group => {
                    await axios.delete(`http://localhost:3001/deleteFYPGroup/${group.groupid}`);
                });
                // Wait for all delete requests to complete
                await Promise.all(deleteRequests);
            } else {
                // If selectedGroup is a single group object, delete it
                await axios.delete(`http://localhost:3001/deleteFYPGroup/${selectedGroup.groupid}`);
            }

            setShowConfirmation(false);
            setSelectedGroup([]);
            const updatedData = groups.filter(group => !selectedGroup.some(selected => selected.groupid === group.groupid));
            setGroups(updatedData);
        } catch (error) {
            console.error('Error deleting Group', error);
        }
    };


    const handleCancelDelete = () => {
        setShowConfirmation(false);
        setSelectedGroup([]);
    };

    const handleSelectAll = () => {
        if (selectedOption === "Capstone-I") {
            const capstoneIGroups = filteredGroups.filter(group => group.category === "Capstone-I");
            setSelectedGroup([...selectedGroup, ...capstoneIGroups]);
        } else if (selectedOption === "Capstone-II") {
            const capstoneIIGroups = filteredGroups.filter(group => group.category === "Capstone-II");
            setSelectedGroup([...selectedGroup, ...capstoneIIGroups]);
        } else {
            setSelectedGroup([...filteredGroups]);
        }
    };

    const handleDeselectAll = () => {
        setSelectedGroup([]);
        setFilteredGroups(selectedOption === "" ? groups : groups.filter(group => group.category === selectedOption));
    };



    const handlePromoteAll = async () => {
        // Update category for each selected Capstone-I group
        const promises = selectedGroup.map(async group => {
            if (group.category === 'Capstone-I') {
                // Update category locally
                group.category = 'Capstone-II';
                try {
                    // Update category in the backend
                    await axios.put(`http://localhost:3001/updateFYPGroupCategory/${group.groupid}`, { category: 'Capstone-II' });
                } catch (error) {
                    console.error('Error updating group category:', error);
                    // Handle error if needed
                }
            }
            return group;
        });

        // Wait for all updates to finish
        await Promise.all(promises);

        // Update state to reflect changes
        setGroups([...groups]);

        // Clear the selected groups
        setSelectedGroup([]);
    };

    const handleDeleteAll = () => {
        // Filter out groups with the category Capstone-II
        const groupsToDelete = selectedGroup.filter(group => group.category === 'Capstone-II');

        // Send delete requests for each group
        groupsToDelete.forEach(async group => {
            try {
                await axios.delete(`http://localhost:3001/deleteFYPGroup/${group.groupid}`);
                // If deletion is successful, remove the group from the state
                setGroups(prevGroups => prevGroups.filter(prevGroup => prevGroup.groupid !== group.groupid));
            } catch (error) {
                console.error('Error deleting Group', error);
            }
        });

        // Clear the selected groups
        setSelectedGroup([]);
    };

    return (
        <div className='container'>
            <div className='shadow-lg p-3 mb-5 mt-5 bg-body rounded' style={{ width: '100%' }}>
                <div className="row">
                    <div className="col-md-auto mb-4 mt-3 text-gred">
                        <div>Display:</div>
                    </div>
                    <div className="col-md-auto mb-4 mt-2">
                        <Form.Select onChange={handleSelectChange} value={selectedOption}>
                            <option value="">All Groups</option>
                            <option value="Capstone-I">Capstone-I</option>
                            <option value="Capstone-II">Capstone-II</option>
                        </Form.Select>
                    </div>
                    <div className="col-sm-auto offset-sm-2 mb-4 mt-2 text-gred">
                        <h2><b>FYP Groups</b></h2>
                    </div>
                </div>
                <div className="row">
                    <div className="table-responsive">
                        <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    {selectedOption !== "" && (
                                        <th style={{ display: 'flex', alignItems: 'center', paddingLeft: '20%' }}>
                                            <Form.Check
                                                type="checkbox"
                                                checked={selectedGroup.length === filteredGroups.length}
                                                onChange={(e) => e.target.checked ? handleSelectAll() : handleDeselectAll()}
                                            />
                                            {selectedOption === "Capstone-I" && (
                                                <span onClick={handlePromoteAll} className="btn-link col-sm-9" title="Click to Promote All Groups" style={{ color: 'green', cursor: 'pointer', textDecoration: 'none' }}>Promote All</span>
                                            )}
                                            {selectedOption === "Capstone-II" && (
                                                <span onClick={handleDeleteAll} className="btn-link col-sm-9" title="Click to Delete All Groups" style={{ color: 'red', cursor: 'pointer', textDecoration: 'none' }}>Delete All</span>
                                            )}
                                        </th>
                                    )}
                                    <th>Group ID</th>
                                    <th>Project Title</th>
                                    <th>Action</th>
                                </tr>

                            </thead>
                            <tbody style={{ fontSize: '13px' }}>
                                {filteredGroups.map(group => (
                                    <tr key={group.groupid}>
                                        {selectedOption !== "" && (
                                            <td>
                                                <Form.Check
                                                    type="checkbox"
                                                    checked={selectedGroup.some(selectedGroup => selectedGroup.groupid === group.groupid)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedGroup([...selectedGroup, group]);
                                                        } else {
                                                            setSelectedGroup(selectedGroup.filter(selectedGroup => selectedGroup.groupid !== group.groupid));
                                                        }
                                                    }}
                                                />
                                            </td>
                                        )}
                                        <td>{group.groupid}</td>
                                        <td>{group.title}</td>
                                        <td>
                                            <span onClick={() => handleViewDetails(group)} style={{ color: '#0496FF', cursor: 'pointer', marginRight: '5px' }}>View Group</span>
                                            <span>|</span>
                                            <span onClick={() => handleDeleteGroup(group)} style={{ fontSize: 'small', color: 'red', cursor: 'pointer', marginLeft: '5px' }}>Delete</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>

                <DeleteFYPGroup
                    show={showConfirmation}
                    onHide={handleCancelDelete}
                    onConfirm={confirmDeleteGroup}
                    message={`Are you sure you want to remove this Group? <br/> ${selectedGroup && selectedGroup.length > 0 ? selectedGroup.map(group => group.title).join(', ') : ''} (${selectedGroup && selectedGroup.length > 0 ? selectedGroup.map(group => group.groupid).join(', ') : ''})`}
                />

            </div>
        </div>
    );

}

export default ViewFYPGroups;