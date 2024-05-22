import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import whiteStudent from '../../../images/whiteStudent.png';
import blueStudent from '../../../images/blueStudent.png';
import whiteGroup from '../../../images/whiteGroup.png';
import blueGroup from '../../../images/blueGroup.png';
import whiteSupervisor from '../../../images/whiteSupervisor.png';
import blueSupervisor from '../../../images/blueSupervisor.png';
import whitePanel from '../../../images/whitePanel.png';
import bluePanel from '../../../images/bluePanel.png';
import { CoordinatorContext } from '../../../context/CoordinatorContext';
import './Dashboard.css';

function Dashboard() {
    const { userid, resetPassword } = useContext(CoordinatorContext);
    const navigate = useNavigate();
    const [isStudentHovered, setStudentHovered] = useState(false);
    const [isSupervisorHovered, setSupervisorHovered] = useState(false);
    const [isGroupHovered, setGroupHovered] = useState(false);
    const [isPanelHovered, setPanelHovered] = useState(false);

    useEffect(() => {
        if (resetPassword !== null) {
            if (resetPassword === false) {
                navigate(`/coordinator/Dashboard/${userid}`);
            }
            else if (resetPassword === true){
                navigate(`/coordinator/ChangePassword/${userid}`);
            }
        }
    }, [userid, resetPassword, navigate]);    

    return (
        <div className="dashboard-container">
            <div className="dashboard-wrapper">
                <Link to={`/coordinator/ViewStudents`} className="card-link">
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
                <Link to={`/coordinator/ViewFYPGroups`} className="card-link">
                    <Card
                        className={isGroupHovered ? "shadow card-container hovered" : "shadow card-container"}
                        style={{ width: '180px', height: '115px' }}
                        onMouseEnter={() => setGroupHovered(true)}
                        onMouseLeave={() => setGroupHovered(false)}
                    >
                        <Card.Body>
                            <img
                                src={isGroupHovered ? blueGroup : whiteGroup}
                                alt="Group Logo"
                                className="card-img"
                            />
                            <div style={{ marginTop: '10px' }}>
                                <span className="custom-button">FYP Groups</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to={`/coordinator/ViewSupervisors`} className="card-link">
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
                <Link to={`/coordinator/ViewPanelMembers`} className="card-link">
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
            </div>
        </div>
    );
}

export default Dashboard;