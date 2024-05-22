import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { PanelMemberContext } from '../../../context/PanelMemberContext';

function EditProfile() {
    const { userid } = useContext(PanelMemberContext);
    const navigate = useNavigate();
    const [panelMember, setPanelMember] = useState(null);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [domain, setDomain] = useState('');
    const [freeslots, setFreeSlots] = useState([]);

    useEffect(() => {
        const fetchPanelMemberInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getPanelMemberInfo/${userid}`);
                setPanelMember(response.data);
                setDomain(response.data.domain);
                setFreeSlots(response.data.freeslots);
            } catch (error) {
                console.error('Error fetching panel member:', error);
            }
        };

        fetchPanelMemberInfo();
    }, [userid]);

    const handleEdit = async () => {
        if (!domain) {
            console.error('Domain is required');
            return;
        }

        if (!freeslots || !Array.isArray(freeslots)) {
            console.error('Free slots data is invalid');
            return;
        }

        if (!freeslots.some(row => row && row.some(slot => slot === 1))) {
            console.error('At least one free slot must be selected');
            return;
        }

        try {
            await axios.post(`http://localhost:3001/editPanelMemberInfo/${userid}`, {
                freeslots,
                domain
            });
            navigate(`/panelMember/ViewProfile/${userid}`);
        } catch (error) {
            console.error('Error updating panel member:', error);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleSlotClick = (event, rowIndex, columnIndex) => {
        event.preventDefault();

        if (rowIndex < 0 || rowIndex >= 6) {
            console.error('Invalid rowIndex:', rowIndex);
            return; // Exit function if rowIndex is invalid
        }

        if (columnIndex < 0 || columnIndex >= 6) {
            console.error('Invalid columnIndex:', columnIndex);
            return;
        }

        const updatedFreeSlots = [...freeslots.map(row => [...(row || Array(6).fill(0))])];
        if (!updatedFreeSlots[rowIndex]) {
            updatedFreeSlots[rowIndex] = Array(6).fill(0);
        }
        updatedFreeSlots[rowIndex][columnIndex] = updatedFreeSlots[rowIndex][columnIndex] ? 0 : 1;
        setFreeSlots(updatedFreeSlots);
    };

    return (
        <div className='container'>
            <div className="shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-gred text-center">
                        <h2><b>Edit Profile</b></h2>
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
                                <label htmlFor="name" className="col-form-label">Name</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm p-2" id="name" value={panelMember ? panelMember.name : ''} disabled />
                            </div>
                        </div>
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="userid">User ID</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm p-2" id="userid" value={panelMember ? panelMember.userid : ''} disabled />
                            </div>
                        </div>
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="domain">Domain</label>
                            </div>
                            <div className="col-sm-8">
                                <input type='text' className="form-control form-control-sm p-2" id="domain" value={domain} onChange={e => setDomain(e.target.value)} required />
                            </div>
                        </div>
                        <div className='form-group row'>
                            <label htmlFor='freeslots'>Free Slots</label>
                            <br /><p style={{ color: 'gray', fontSize: 'small', paddingTop: '2px', fontStyle: 'italic' }}>Please select those slots in which you are free</p>
                            <div className="table-responsive">
                                <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }} required>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {days.map((day, index) => (
                                                <th key={index}>{day}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {freeslots && [1, 2, 3, 4, 5, 6].map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td>{row}</td>
                                                {days.map((_, columnIndex) => {
                                                    const slot = freeslots[rowIndex] ? freeslots[rowIndex][columnIndex] : 0;
                                                    return (
                                                        <td key={columnIndex}>
                                                            <button
                                                                className="btn btn-lg btn-custom"
                                                                style={{ backgroundColor: slot ? '#0496FF' : 'transparent', borderColor: 'lightgray', height: '4vh', width: '4vw' }}
                                                                onClick={(event) => handleSlotClick(event, rowIndex, columnIndex)}
                                                            />

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
                            <button type="button" className="btn btn-custom" style={{ backgroundColor: '#0496FF', color: 'white' }} onClick={handleEdit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;