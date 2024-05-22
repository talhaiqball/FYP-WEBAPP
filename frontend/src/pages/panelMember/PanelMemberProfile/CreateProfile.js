import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';

function CreateProfile() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [cellColors, setCellColors] = useState(Array.from({ length: 18 }, () => "#ffffff")); // 3 rows * 6 columns

    const handleCellButtonClick = (index, event) => {
        event.preventDefault();
        const newCellColors = [...cellColors];
        newCellColors[index] = '#0496FF';
        setCellColors(newCellColors);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="col-md-9" style={{ zIndex: 0 }} responsive>
                <fieldset className="form-container py-9 fs-6">
                    <legend className="centered-elements" style={{ fontWeight: 'bold', paddingTop: '2%' }}>Create Profile</legend>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" id="name" style={{ width: '120%', height: '40px' }} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userID">User ID<span style={{ color: 'red' }}>*</span></label>
                            <input type="text" className="form-control" id="userID" style={{ width: '120%', height: '40px' }} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="domain">Domain<span style={{ color: 'red' }}>*</span></label>
                            <input type='text' className="form-control" id="domain" style={{ width: '120%', height: '40px' }} required/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='freeslots'>Free Slots<span style={{ color: 'red' }}>*</span></label>
                            <br/><p style={{ color: 'gray',fontSize:'small',paddingTop:'2px',fontStyle:'italic' }}>Please select those slots in which you are free</p>
                            <div className='elements'>
                                <Table style={{ fontSize: 'small', alignItems: 'center', textAlign: 'center' }} required>
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
                                                {days.map((_, columnIndex) => (
                                                    <td key={columnIndex}>
                                                        <button
                                                            className="btn table-button"
                                                            style={{
                                                                backgroundColor: cellColors[rowIndex * days.length + columnIndex],
                                                                borderColor: 'lightgray'
                                                            }}
                                                            onClick={(event) => handleCellButtonClick(rowIndex * days.length + columnIndex, event)}
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
                        <button type="submit" className="btn btn-custom" style={{ backgroundColor: '#0496FF', color: 'white' }}>Save</button>
                    </form>
                </fieldset>
            </div>
        </div>
    );
}

export default CreateProfile;
