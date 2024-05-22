import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import whiteStudent from '../images/whiteStudent.png';
import blueStudent from '../images/blueStudent.png';
import whiteCoordination from '../images/whiteCoordination.png';
import blueCoordination from '../images/blueCoordination.png';
import whiteSupervisor from '../images/whiteSupervisor.png';
import blueSupervisor from '../images/blueSupervisor.png';
import whitePanel from '../images/whitePanel.png';
import bluePanel from '../images/bluePanel.png';
import './SelectUserPage.css';

function SelectUserPage() {
  const [isStudentHovered, setStudentHovered] = useState(false);
  const [isCoordinatorHovered, setCoordinatorHovered] = useState(false);
  const [isSupervisorHovered, setSupervisorHovered] = useState(false);
  const [isPanelHovered, setPanelHovered] = useState(false);

  const navigate = useNavigate()
  function selectUser(event, user) {
    event.stopPropagation();
    if (user === "student") {
      navigate(`/student/Login`)
    }
    else if (user === "supervisor") {
      navigate(`supervisor/Login`)
    }
    else if (user === "coordinator") {
      navigate('/coordinator/Login')
    }
    else if (user === "panelMember") {
      navigate(`panelMember/Login`)
    }
  }

  return (
    <div className="container-fluid container">
      <div className="row">
        <div className="col-md-3">
          <table className="dashboard-table">
            <tbody>
              <tr>
                <td>
                  <Link to="/student/Login" onClick={(event) => selectUser(event, "student")} className="card-link">
                    <Card
                      className={isStudentHovered ? "shadow card-container hovered" : "shadow card-container"}
                      style={{ width: '180px', height: '115px' }}
                      onMouseEnter={() => setStudentHovered(true)}
                      onMouseLeave={() => setStudentHovered(false)}
                    >
                      <Card.Body>
                        <img
                          src={isStudentHovered ? blueStudent : whiteStudent}
                          alt="Student Logo"
                          className="card-img"
                        />
                        <div style={{ marginTop: '10px' }}>
                          <span className="custom-button">Students</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </td>
                <td>
                  <Link to="/coordinator/Login" onClick={(event) => selectUser(event, "coordinator")} className="card-link">
                    <Card
                      className={isCoordinatorHovered ? "shadow card-container hovered" : "shadow card-container"}
                      style={{ width: '180px', height: '115px' }}
                      onMouseEnter={() => setCoordinatorHovered(true)}
                      onMouseLeave={() => setCoordinatorHovered(false)}
                    >
                      <Card.Body>
                        <img
                          src={isCoordinatorHovered ? blueCoordination : whiteCoordination}
                          alt="Coordinator Logo"
                          className="card-img"
                        />
                        <div style={{ marginTop: '10px' }}>
                          <span className="custom-button">FYP Coordinator</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </td>
                <td>
                  <Link to="/supervisor/Login" onClick={(event) => selectUser(event, "supervisor")} className="card-link">
                    <Card
                      className={isSupervisorHovered ? "shadow card-container hovered" : "shadow card-container"}
                      style={{ width: '180px', height: '115px' }}
                      onMouseEnter={() => setSupervisorHovered(true)}
                      onMouseLeave={() => setSupervisorHovered(false)}
                    >
                      <Card.Body>
                        <img
                          src={isSupervisorHovered ? blueSupervisor : whiteSupervisor}
                          alt="Supervisor Logo"
                          className="card-img"
                        />
                        <div style={{ marginTop: '10px' }}>
                          <span className="custom-button">Supervisors</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </td>
                <td>
                  <Link to="/panelMember/Login" onClick={(event) => selectUser(event, "panelMember")} className="card-link">
                    <Card
                      className={isPanelHovered ? "shadow card-container hovered" : "shadow card-container"}
                      style={{ width: '180px', height: '115px' }}
                      onMouseEnter={() => setPanelHovered(true)}
                      onMouseLeave={() => setPanelHovered(false)}
                    >
                      <Card.Body>
                        <img
                          src={isPanelHovered ? bluePanel : whitePanel}
                          alt="Panel Member Logo"
                          className="card-img"
                        />
                        <div style={{ marginTop: '10px' }}>
                          <span className="custom-button">Panel Members</span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SelectUserPage;