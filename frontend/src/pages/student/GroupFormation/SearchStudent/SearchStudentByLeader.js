import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";

const SearchStudentByLeader = () => {
  const [keyword, setKeyword] = useState("");
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const viewProfile = (student) => {
    navigate("/student/ViewStudentProfileByLeader", { state: { student } });
  };

  const handleSearch = async () => {
    if (!keyword) {
      setMessage("Keyword is required");
      return;
    }
    await axios
      .post("http://localhost:3001/searchStudents", { keyword: keyword })
      .then((response) => {
        console.log(response.data);
        if (response.data.students.length > 0) {
          setStudents(response.data.students);
          setMessage(response.data.message);
        } else {
          setStudents([]);
          setMessage(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="conatiner">
      <div className="shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row align-items-center">
          <div className="col-sm-4 mb-4 text-gred"></div>

          <div className="col-sm-5 mb-4 mt-2 text-center text-gred">
            <h2>
              <b>Students List</b>
            </h2>
            <input
              type="text"
              class="form-control"
              id="keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword"
            />
            <button
              class="btn btn-primary mt-2 btn-block"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              class="btn btn-secondary mt-2"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                navigate("/student/ViewPendingRequestByLeader");
              }}
            >
              Pending Invites
            </button>
          </div>
        </div>
        <div className="row">
          <div className="table-responsive ">
            <Table
              className="table table-striped table-hover text-center table-sm"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.userid}>
                    <td>{index + 1}</td>
                    <td>{student.userid}</td>
                    <td>{student.name}</td>
                    <td>
                      <span
                        style={{
                          fontSize: "small",
                          color: "#0496FF",
                          cursor: "pointer",
                          marginRight: "5px",
                        }}
                        onClick={() => viewProfile(student)}
                      >
                        View Profile
                      </span>
                      <span>|</span>
                      <span
                        style={{
                          fontSize: "small",
                          color: "#0496FF",
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                      >
                        Send Invite
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchStudentByLeader;
