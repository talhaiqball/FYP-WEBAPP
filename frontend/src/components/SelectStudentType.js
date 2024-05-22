import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

export default function SelectStudentType() {
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        if (selectedOption === "AppliedStudents") {
            navigate('/coordinator/ViewAppliedStudents');
        } else if (selectedOption === "TemporaryEnrolledStudents") {
            navigate('/coordinator/ViewTemporarilyEnrolledStudents');
        } else {
            navigate('/coordinator/ActualEnrolledStudents');
        }
    }, [selectedOption]);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '10px' }}>Display:</span>
            <Form.Select
                onChange={handleSelectChange}
                value={selectedOption}
            >
                <option value="AppliedStudents">Applied Students</option>
                <option value="TemporaryEnrolledStudents">Temporary Enrolled Students</option>
                <option value="ActualEnrolledStudents">Actual Enrolled Students</option>
            </Form.Select>
        </div>
    );
}
