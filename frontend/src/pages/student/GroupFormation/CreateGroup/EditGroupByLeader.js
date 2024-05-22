import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { StudentContext } from "../../../../context/StudentContext";

const EditGroupByLeader = () => {
  const navigate = useNavigate();
  const [isLeader, setIsLeader] = useState(false);
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [supervisor, setSupervisor] = useState({});
  const { userid } = useContext(StudentContext);

  const [groupTitle, setGroupTitle] = useState("");
  const [groupDomains, setGroupDomains] = useState("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSupervisorProfile = (supervisor) => {
    navigate(`/coordinator/ViewSupervisorProfile`, { state: { supervisor } });
  };

  useEffect(() => {
    const isLeaderValue = localStorage.getItem("isLeader");
    setIsLeader(isLeaderValue === "true");

    // Fetch group data from API
    const fetchGroupData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/viewGroupByLeader/${userid}`);
        console.log("API response:", response.data);
        setGroup(response.data.group);
        setMembers(response.data.members);
        setSupervisor(response.data.supervisor);

        setGroupTitle(response.data.group.title);
        setGroupDomains(response.data.group.domain);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchGroupData();
  }, [userid]);

  const handleDeleteGroup = async (event) => {
        event.preventDefault();
        console.log(group.groupid);
        await axios.post('http://localhost:3001/deleteGroup', {
            groupid: group.groupid
        })
        .then(res =>{
            if (res.status === 201){
                console.log(res);
                alert(`Group: ${res.data.group.groupid} Deleted Successfully`)
                navigate(`/student/Dashboard/${userid}`);
            }
        }).catch(err => {
            alert(err)
        })
  }  

  const handleUpdateGroup = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/editGroup`, {
        groupid: group.groupid,
        groupTitle,
        groupDomains,
      });

      console.log("Update response:", response.data);
      if (response.data.message === "Group Information Updated.") {
        alert("Group updated successfully");
        // Optionally, navigate back or to a success page
      }
    } catch (error) {
      console.error("Error updating group:", error);
      alert("Failed to update group");
    }
  };

  return (
    <div className="container">
      <div className="shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded">
        <div className="row">
          <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-center">
            <h2>
              <b>Group Details</b>
            </h2>
          </div>
          <div className="col-sm-3 mb-4 mt-3 text-end">
            <button className="btn-close" onClick={handleGoBack} style={{ marginRight: "1rem" }} />
          </div>
        </div>
        <div className="row">
          <form style={{ paddingLeft: "50px" }} onSubmit={handleUpdateGroup}>
            <div className="form-group row pt-3">
              <div className="col-sm-2">
                <label htmlFor="groupid" className="col-form-label">
                  Group ID
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control form-control-sm p-2"
                  id="groupid"
                  value={group?.groupid || ""}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row pt-3">
              <div className="col-sm-2">
                <label htmlFor="projectTitle" className="col-form-label">
                  Project Title
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control form-control-sm p-2"
                  id="projectTitle"
                  name="title"
                  value={groupTitle}
                  onChange={(e) => setGroupTitle(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row pt-3">
              <div className="col-sm-2">
                <label htmlFor="groupDomain" className="col-form-label">
                  Domain
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control form-control-sm p-2"
                  id="groupDomain"
                  name="domain"
                  value={groupDomains}
                  onChange={(e) => setGroupDomains(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row pt-3">
              <div className="col-sm-2">
                <label htmlFor="groupDomain" className="col-form-label">
                  Program
                </label>
              </div>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control form-control-sm p-2"
                  id="groupDomain"
                  name="domain"
                  value={group?.program || ""}
                  disabled
                />
              </div>
            </div>
            <div className="form-group row pt-3">
              <div className="col-md-2 pt-2">
                <label htmlFor="supervisor" className="col-form-label">
                  Supervisor
                </label>
              </div>
              <div className="col-md-8 pt-3">
                <span
                  className="btn-link"
                  onClick={() => handleSupervisorProfile(group?.supervisor)}
                  style={{
                    color: "#0496FF",
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                  title="View Profile"
                >
                  {supervisor?.name || ""}
                </span>
              </div>
            </div>
            <div className="form-group row pt-3">
              <div className="col-sm-4">
                <label htmlFor="members" className="col-form-label">
                  Group Members
                </label>
              </div>
              <div className="offset-sm-2">
                {members?.map((member, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginRight: "400px",
                    }}
                  >
                    <span
                      className="btn-link"
                      onClick={() => handleSupervisorProfile(member)}
                      style={{
                        color: "#0496FF",
                        cursor: "pointer",
                        marginRight: "5px",
                        textDecoration: "none",
                      }}
                      title="View Profile"
                    >
                      {member.isLeader === true ? `${member.name + " - Leader"}` : member.name}
                    </span>
                    <button
                      style={{
                        alignItems: "right",
                        backgroundColor: "#ff4d4d",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        padding: "5px 10px",
                        marginLeft: "10px",
                      }}
                      title="Delete Member"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group row pt-3">
              <div className="col-sm-2">
                <label htmlFor="freeslots">Free Slots</label>
              </div>
              <div className="table-responsive pt-3">
                <Table
                  className="table table-striped table-hover text-center table-sm"
                  style={{ width: "100%" }}
                >
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
                        {[1, 2, 3, 4, 5, 6].map((slot, columnIndex) => (
                          <td key={columnIndex}>
                            <button
                              className="btn btn-lg btn-custom"
                              style={{
                                backgroundColor: "#0496FF",
                                borderColor: "lightgray",
                                height: "4vh",
                                width: "4vw",
                              }}
                              disabled
                            ></button>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
            <div className="row">
              <div className="row">
                <div className="col">
                  <button className="btn btn-danger float-start" onClick={handleDeleteGroup}>
                    Delete Group
                  </button>
                </div>
                <div className="col text-end">
                  <button className="btn btn-danger" style={{ marginRight: "5px" }}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleUpdateGroup}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditGroupByLeader;
