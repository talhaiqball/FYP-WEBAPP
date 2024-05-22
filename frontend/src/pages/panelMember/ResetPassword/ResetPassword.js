import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PanelMemberContext } from "../../../context/PanelMemberContext";

const ResetPassword = () => {
  const {updateResetPassword} = useContext(PanelMemberContext)
  const [userid, setUserid] = useState("");
  const [currentUserid, setCurrentUserid] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:3001/resetPasswordPanelMember/");
      console.log(response.data);
      setCurrentUserid(userid);
      setEmailSent(true);
      setUserid("");
      updateResetPassword(true);
    } catch (error) {
      console.log(error);
      alert("Invalid User ID! Enter Again...");
    }
  };

  return (
    <div className="container">
      <div
        className="shadow-lg p-5 col-sm-auto col-sm-7 mb-5 mt-5 bg-body rounded"
      >
        <div className="row">
          <div className="mb-3 mt-2 text-center">
            <h2>
              <b>Reset Password</b>
            </h2>
          </div>
          <div className="col-sm-7 offset-sm-3 mb-4 text-center">
            {emailSent ? (
              <span style={{ color: "#b0b0b0" }}>
                Email is Sent with login Information to{" "}
                <b>{currentUserid}@gift.edu.pk</b>
                <br />
                Type your Roll No/User ID to Retrieve Password on GIFT Email
                Account
              </span>
            ) : (
              <span style={{ color: "#b0b0b0" }}>
                Type your Roll No/User ID to Retrieve Password on GIFT Email
                Account
              </span>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <div className="col-sm-auto offset-sm-1 pt-2">
                <label htmlFor="userid">User ID</label>
              </div>
              <div className="col-sm-auto col-sm-9">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control form-control-sm p-2"
                    id="userid"
                    value={userid}
                    onChange={(event) => setUserid(event.target.value)}
                    aria-describedby="basic-addon2"
                  />
                  <span className="pt-1 p-1" id="basic-addon2">
                    @gift.edu.pk
                  </span>
                </div>
              </div>
            </div>
            <div className="text-center mt-3">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#0496FF",
                  color: "white",
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#007bff"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#0496FF"}
              >
                Submit
              </button>

              <div className="mt-3 mb-3">
                <Link
                  to={`/panelMember/Login`}
                  className="btn-link" style={{ color: "#0496FF" }}
                >
                  Click Here to Login?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


export default ResetPassword;