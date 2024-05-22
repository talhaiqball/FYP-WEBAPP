import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddTemporarilyEnrolledStudents() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);

    function handleChange(e) {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.type === "text/csv") {
                setFile(selectedFile);
                console.log("File selected successfully:", selectedFile.name);
            } else {
                console.log("Unsupported file type:", selectedFile.type);
                setFile(null);
            }
        }
    }

    const handleUpload = async () => {
        if (!file) {
            console.log("No file selected");
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', file);

            await axios.post('http://localhost:3001/uploadFile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            navigate('/coordinator/ViewTemporarilyEnrolledStudents', { uploaded: true });

        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return (
        <div className='container'>
            <div className="shadow-lg p-5 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-md-12 text-center mb-4">
                        <h3 className="text-gred"><b>Add Temporarily Enrolled Students File</b></h3>
                    </div>
                </div>
                <div className='row'>
                    <div className='form-group'>
                        <input
                            type="file"
                            onChange={handleChange}
                            accept=".csv"
                            className="form-control"
                        />
                    </div>
                    <div className='form-group mt-3'>
                        <button
                            type="button"
                            className="btn"
                            onClick={handleUpload}
                            disabled={!file}
                            style={{ backgroundColor: '#0496FF', color: 'white' }}
                        >
                            Upload
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTemporarilyEnrolledStudents;