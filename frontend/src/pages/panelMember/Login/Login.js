import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { PanelMemberContext } from '../../../context/PanelMemberContext';

const Login = () => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateUserId } = useContext(PanelMemberContext);

  const handleLogin = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:3001/signinPanelMember/${userid}`, { password })
      .then(res => {
        console.log(res.data);
        updateUserId(userid);
        navigate(`/panelMember/Dashboard/${userid}`);
      })
      .catch(err => {
        console.log(err);
        alert("Invalid User ID or Password! Enter again..");
      });
  };

  return (
    <div className="container">
      <div className="shadow-lg p-5 col-md-7 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-6 offset-sm-3 mb-3 text-gred text-center">
            <h2>
              <b>Login</b>
            </h2>
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group row mt-3">
            <div className="col-sm-3 mt-1">
              <label htmlFor="userid">User ID</label>
            </div>
            <div className="col-sm-7">
              <input type="text" className="form-control form-control-sm p-2" id="userid" value={userid} onChange={(event) => setUserid(event.target.value)} />
            </div>
          </div>
          <div className="form-group row mt-3">
            <div className="col-sm-3 mt-1">
              <label htmlFor="password">Password</label>
            </div>
            <div className="col-sm-7">
              <input type="password" className="form-control form-control-sm p-2" id="password" value={password} onChange={(event) => setPassword(event.target.value)}/>
            </div>
          </div>
          <div className="text-center mt-3">
            <button type="submit" className="btn btn-block" style={{
              backgroundColor: "#0496FF",
              color: "white",
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#007bff"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#0496FF"}>Login</button>
            <div className="mt-3"> <Link to={`/panelMember/ResetPassword/${userid}`} className='btn-link' style={{ color: "#0496FF" }}>Forgot password?</Link></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;