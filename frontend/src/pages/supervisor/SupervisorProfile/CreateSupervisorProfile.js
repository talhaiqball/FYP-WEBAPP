import React, { useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import SupervisorSidebar from '../../../components/Sidebar/SupervisorSidebar';
import './styles/SupervisorProfile.css';
function CreateSupervisorProfile() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [formData, setFormData] = useState({
        name: '',
        userId: '',
        domain: '',
        supervisionSlots: '',
        suggestedIdeas: ['', '', ''],
        previousProjects: ['', '', ''],
        freeSlots: Array.from({ length: 6 }, () => Array.from({ length: 6 }, () => false)) // 6 days * 6 slots
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSlotToggle = (rowIndex, columnIndex) => {
        const updatedSlots = [...formData.freeSlots];
        updatedSlots[rowIndex][columnIndex] = !updatedSlots[rowIndex][columnIndex];
        setFormData({ ...formData, freeSlots: updatedSlots });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/supervisor-profile', formData); 
        } catch (error) {
            console.error('Error storing supervisor profile:', error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="col-md-3" style={{ zIndex: 1 }}>
            <SupervisorSidebar />
            </div>
            <div className="col-md-9" style={{ zIndex: 0 }} responsive>
                <fieldset className="form-container py-9 fs-6">
                    <legend className="centered-elements" style={{ fontWeight: 'bold', paddingTop: '2%' }}>Create Profile</legend>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" id="name" style={{ width: '100%', height: '40px' }} onChange={handleChange} name="name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userId">ID<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" id="userId" style={{ width: '100%', height: '40px' }} onChange={handleChange} name="userId" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="domain">Domain<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" id="domain" style={{ width: '100%', height: '40px' }} onChange={handleChange} name="domain" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="supervisionSlots">Supervision Slots<span style={{ color: 'red' }}>*</span></label>
                            <input type="number" className="form-control" id="supervisionSlots" style={{ width: '100%', height: '40px' }} onChange={handleChange} name="supervisionSlots" required />
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div style={{ flex: 1, marginRight: '10px' }}>
                                <div className="form-group">
                                    <label htmlFor="suggestedIdeas" required>Suggested Ideas<span style={{ color: 'red' }}>*</span></label>
                                    <div className="elements">
                                        {formData.suggestedIdeas.map((idea, index) => (
                                            <div key={index}>
                                                <textarea className='form-control' id={`suggestedIdeas${index + 1}`} name="suggestedIdeas" style={{ width: '190%' }} onChange={(e) => handleChange({ target: { name: `suggestedIdeas[${index}]`, value: e.target.value } })} value={idea} required />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: 1, marginLeft: '100px' }}>
                                <div className="form-group">
                                    <label htmlFor="previousProjects" required>Previous Projects<span style={{ color: 'red' }}>*</span></label>
                                    <div className="elements">
                                        {formData.previousProjects.map((project, index) => (
                                            <div key={index}>
                                                <textarea className='form-control' id={`previousProject${index + 1}`} name="previousProjects" style={{ width: '190%' }} onChange={(e) => handleChange({ target: { name: `previousProjects[${index}]`, value: e.target.value } })} value={project} required />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor='freeSlots'>Free Slots<span style={{ color: 'red' }}>*</span></label>
                            <br /><p style={{ color: 'gray', fontSize: 'small', paddingTop: '2px', fontStyle: 'italic' }}>Please select those slots in which you are free</p>
                            <div>
                                <Table style={{ fontSize: 'small', alignItems: 'center', textAlign: 'center',width:'120%' }} required>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {days.map((day, index) => (
                                                <th key={index}>{day}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.freeSlots.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td>{rowIndex + 1}</td>
                                                {row.map((slot, columnIndex) => (
                                                    <td key={columnIndex}>
                                                        <button
                                                            className="btn table-button"
                                                            style={{
                                                                backgroundColor: formData.freeSlots[rowIndex][columnIndex] ? '#0496FF' : '#ffffff',
                                                                borderColor: 'lightgray'
                                                            }}
                                                            onClick={() => handleSlotToggle(rowIndex, columnIndex)}
                                                            type="button"
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-custom" style={{ backgroundColor: '#0496FF', color: 'white' }}>Save</button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}

export default CreateSupervisorProfile;
