import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import whiteAppliedStudents from '../../../images/whiteAppliedStudents.png';
import blueAppliedStudents from '../../../images/blueAppliedStudents.png';
import whiteTemporaryStudents from '../../../images/whiteTemporaryStudents.png';
import blueTemporaryStudents from '../../../images/blueTemporaryStudents.png';
import whiteRegisteredStudents from '../../../images/whiteRegisteredStudents.png';
import blueRegisteredStudents from '../../../images/blueRegisteredStudents.png';
import './StudentsRegistration.css';

function StudentsRegistration() {
    const [isAppliedStudents, setAppliedStudents] = useState(false);
    const [isTemporaryStudents, setTemporaryStudents] = useState(false);
    const [isActualStudents, setActualStudents] = useState(false);

    return (
        <div className="stu-container">
            <div className="stu-wrapper">
                <Link to={`/coordinator/ViewAppliedStudents`} className="card-link">
                    <Card
                        className={isAppliedStudents ? "shadow card-container hovered" : "shadow card-container"}
                        style={{ width: '190px', height: '135px' }}
                        onMouseEnter={() => setAppliedStudents(true)}
                        onMouseLeave={() => setAppliedStudents(false)}
                    >
                        <Card.Body>
                            <img
                                src={isAppliedStudents ? blueAppliedStudents : whiteAppliedStudents}
                                alt="Applied Students Logo"
                                className="card-img"
                            />
                            <div>
                                <span className="custom-button">Applied Students</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to={`/coordinator/ViewTemporarilyEnrolledStudents`} className="card-link">
                    <Card
                        className={isTemporaryStudents ? "shadow card-container hovered" : "shadow card-container"}
                        style={{ width: '190px', height: '135px' }}
                        onMouseEnter={() => setTemporaryStudents(true)}
                        onMouseLeave={() => setTemporaryStudents(false)}
                    >
                        <Card.Body>
                            <img
                                src={isTemporaryStudents ? blueTemporaryStudents : whiteTemporaryStudents}
                                alt="Temporary Students Logo"
                                className="card-img"
                            />
                            <div>
                                <span className="custom-button">Temporary Students Enrollment</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
                <Link to={`/coordinator/ActualEnrolledStudents`} className="card-link">
                    <Card
                        className={isActualStudents ? "shadow card-container hovered" : "shadow card-container"}
                        style={{width: '190px', height: '135px' }}
                        onMouseEnter={() => setActualStudents(true)}
                        onMouseLeave={() => setActualStudents(false)}
                    >
                        <Card.Body>
                            <img
                                src={isActualStudents ? blueRegisteredStudents : whiteRegisteredStudents}
                                alt="Registered Students Logo"
                                className="card-img"
                            />
                            <div>
                                <span className="custom-button">Actual Students Enrollment</span>
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </div>
    );
}

export default StudentsRegistration;
