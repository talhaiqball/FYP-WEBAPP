import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import axios from 'axios';

function ViewStudentProfile() {
  const location = useLocation();
  // const [student, setStudent] = useState(null);
  const student = location.state

//   useEffect(() => {
//     const fetchStudentInfo = async () => {
//         try {
//             const response = await axios.get(`http://localhost:3001/getStudentInfo/${userid}`);
//             setStudent(response.data);
//         } catch (error) {
//             console.error('Error fetching student:', error);
//         }
//     };

//     fetchStudentInfo();
// }, [userid]);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="container">
      <div className="shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-gred text-center">
            <h2>
              <b>View Profile</b>
            </h2>
          </div>
        </div>
        <div className="row">
          {student && (
            <form style={{ paddingLeft: "50px" }}>
              <div className="form-group row pt-3">
                <div className="col-sm-2">
                  <label htmlFor="name" className="col-form-label">
                    Name
                  </label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control form-control-sm p-2"
                    id="name"
                    value={student.name}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row pt-3">
                <div className="col-sm-2">
                  <label htmlFor="userid" className="col-form-label">
                    User ID
                  </label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control form-control-sm p-2"
                    id="userid"
                    value={student.userid}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row pt-3">
                <div className="col-sm-2">
                  <label htmlFor="program" className="col-form-label">
                    Program<span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control form-control-sm p-2"
                    id="program"
                    value={student.program}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row pt-3">
                <div className="col-sm-2">
                  <label htmlFor="cgpa" className="col-form-label">
                    CGPA<span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <div className="col-sm-8">
                  <input
                    type="text"
                    className="form-control form-control-sm p-2"
                    id="cgpa"
                    value={student.CGPA}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row pt-3">
                <div className="col-sm-2">
                  <label htmlFor="interests">
                    Interests<span style={{ color: "red" }}>*</span>
                  </label>
                </div>
                <div className="col-sm-8">
                  <textarea
                    type="text"
                    className="form-control form-control-sm p-2"
                    id="interests"
                    value={student.interests}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row pt-3">
                <div className="col-sm-2">
                  <label htmlFor="skills" className="col-form-label">
                    Skills
                  </label>
                </div>
                <div className="col-sm-8">
                  <textarea
                    type="text"
                    className="form-control form-control-sm p-2"
                    id="skills"
                    value={student.skills}
                    disabled
                  />
                </div>
              </div>
              <div>
              <button className="btn btn-primary mt-5">Invite to Group</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewStudentProfile;
