// AddStudentsFile.js

import { useState } from 'react';
import axios from 'axios';

function AddStudentsFile({ fetchData }) {
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.type === "text/csv") {
                setFile(selectedFile);
                console.log("File selected successfully:", selectedFile.name);
            } else {
                console.log("Unsupported file type:", selectedFile.type);
                setFile(null);
            }
        } else {
            setFile(null);
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
    
            // Fetch data after successful file upload
            fetchData(); // Call fetchData function passed as prop
            console.log("Data updated after file upload");
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }
    

    return (
        <div className='row mb-3' style={{ marginLeft: '10px' }}>
            <div className="col-md-auto mb-4 mt-3 text-gred">
                <div>Add File:</div>
            </div>
            <div className="col-md-9 mb-4 mt-2">
                <div className='form-group'>
                    <input
                        type="file"
                        onChange={handleChange}
                        accept=".csv"
                        className="form-control"
                    />
                </div>
            </div>
            <div className="col-md-auto mb-4 mt-2">
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
    );
}

export default AddStudentsFile;