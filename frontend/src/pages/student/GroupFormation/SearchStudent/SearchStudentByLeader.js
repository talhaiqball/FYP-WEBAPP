import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

const StudentSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [students, setStudents] = useState([]);
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        if (!keyword) {
            setMessage("Keyword is required");
            return;
        }

        // try {
        //     console.log(keyword)
        //     const response = await axios.get('http://localhost:3001/searchSupervisors', {keyword})
        //     console.log(response.data);

        //     if (response.data.students.length > 0) {
        //         setStudents(response.data.students);
        //         setMessage(response.data.message);
        //     } else {
        //         setStudents([]);
        //         setMessage(response.data.message);
        //     }
        // } catch (error) {
        //     setMessage("An error occurred");
        // }

        await axios.post('http://localhost:3001/searchStudents', {keyword: keyword})
        .then(response => {
            console.log("Success");
            if (response.data.students.length > 0) {
                setStudents(response.data.students);
                setMessage(response.data.message);
            } else {
                setStudents([]);
                setMessage(response.data.message);
            }
        }).catch(error => {
            console.log(error);
        })
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="form-group">
                        <label htmlFor="keyword">Keyword</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="keyword" 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary mt-2" onClick={handleSearch}>Search</button>

                    {message && <div className="alert alert-info mt-3">{message}</div>}

                    {students.length > 0 && (
                        <div className="mt-3">
                            <h4>Students found:</h4>
                            <ul className="list-group">
                                {students.map((student) => (
                                    <li key={student.userid} className="list-group-item">
                                        {student.name} (ID: {student.userid})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentSearch;
