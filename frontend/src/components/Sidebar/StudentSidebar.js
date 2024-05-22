import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import { StudentContext } from '../../context/StudentContext';
import axios from 'axios';
import './Sidebar.css';

export default function StudentSidebar() {
    const { userid, profileCompleted, resetPassword } = useContext(StudentContext);
    const [student, setStudent] = useState(null);
    const [showSidebar, setShowSidebar] = useState(true);
    const [hoverText, setHoverText] = useState(showSidebar ? "Close Sidebar" : "Open Sidebar");
    const [toggleIconPosition, setToggleIconPosition] = useState(0);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    useEffect(() => {
        console.log('showSidebar:', showSidebar);
        const body = document.querySelector('body');
        if (body) {
            if (showSidebar) {
                body.style.paddingLeft = '30px';
                body.style.paddingRight = '0';
            } else {
                body.style.paddingLeft = '0';
                body.style.paddingRight = '0';
            }
        }
    }, [showSidebar]);

    const handleResize = () => {
        setShowSidebar(window.innerWidth >= 768);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setToggleIconPosition(showSidebar ? 250 : 0);
    }, [showSidebar]);

    useEffect(() => {
        if (userid) {
            axios.get(`http://localhost:3001/getStudentInfo/${userid}`)
                .then(response => {
                    console.log('Student Info:', response.data);
                    if (response.data) {
                        setStudent(response.data);
                    } else {
                        console.error('Student data not found in API response');
                    }
                })
                .catch(error => {
                    console.error('Error fetching Student data:', error);
                });
        }
    }, [userid]);

    return (
        <div>
            {student && (
                <div className={`container-fluid sidebar ${showSidebar ? 'd-flex' : 'd-none'}`} style={{ fontFamily: 'arial, helvetica, sans-serif', zIndex: 100 }}>
                    <div className='bg-custom col-auto d-flex flex-column justify-content-between text-start' style={{ top: 120, left: 0, width: 251, height: '100%', position: "fixed" }}>
                        <div style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
                            <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
                                <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                                    <Link to={`/student/Dashboard/${userid}`} className={`nav-link text-white fs-6 ${(!profileCompleted || resetPassword) ? 'disabled' : ''}`} aria-current="page">
                                        <span className='ms-3'>Dashboard</span>
                                    </Link>
                                </li>
                                <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                                    <Link to={'/student/GroupFormation'} className={`nav-link text-white fs-6 ${(!profileCompleted || resetPassword) ? 'disabled' : ''}`} aria-current="page">
                                        <span className='ms-3'>Group Formation</span>
                                    </Link>
                                </li>
                                <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                                    <Link to={'/student/'} className={`nav-link text-white fs-6 ${(!profileCompleted || resetPassword) ? 'disabled' : ''}`} aria-current="page">
                                        <span className='ms-3'>Supervisor Selection</span>
                                    </Link>
                                </li>
                                <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                                    <Link to={'/'} className={`nav-link text-white fs-6 ${(!profileCompleted || resetPassword) ? 'disabled' : ''}`} aria-current="page">
                                        <span className='ms-3'>Student Meetings</span>
                                    </Link>
                                </li>
                                <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                                    <Link to={'/'} className={`nav-link text-white fs-6 ${(!profileCompleted || resetPassword) ? 'disabled' : ''}`} aria-current="page">
                                        <span className='ms-3'>Presentations</span>
                                    </Link>
                                </li>
                                <li className="nav-item text-white fs-6 my-1 py-2 py-sm-0">
                                    <Link to={'/'} className={`nav-link text-white fs-6 ${(!profileCompleted || resetPassword) ? 'disabled' : ''}`} aria-current="page">
                                        <span className='ms-3'>Project Deliverables</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-auto" style={{ position: "fixed", left: 0, bottom: 0, width: 251, backgroundColor: '#0496FF', borderTop: '1px solid #fff' }}>
                            <div className="dropdown open">
                                <Link className="text-decoration-none text-white dropdown-toggle p-3"
                                    type="button"
                                    id="triggerId"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    <i className='bi bi-person-circle'></i><span className='ms-3'>{student.name}</span>
                                </Link>
                                <div className="dropdown-menu small" aria-labelledby="triggerId">
                                    <Link className={`dropdown-item small ${(!profileCompleted || resetPassword) ? 'disabled' : ''}`} to={`ViewProfile/${userid}`}><span >View Profile</span></Link>
                                    <Link className={`dropdown-item small ${(!profileCompleted || resetPassword) ? 'disabled' : ''}`} to={`ChangePassword/${userid}`}><span >Change Password</span></Link>
                                    <Link className='dropdown-item small' to={"Login"}><span >Logout</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )}
            <div className="sidebar-toggle my-5" style={{ left: toggleIconPosition }} onClick={toggleSidebar}>
                <i className={`bi ${showSidebar ? 'bi-chevron-left' : 'bi-chevron-right'}`}
                    onMouseEnter={() => setHoverText(showSidebar ? "Close Sidebar" : "Open Sidebar")}
                    onMouseLeave={() => setHoverText('')}
                ></i>
                {hoverText && <span className="hover-text">{hoverText}</span>}
            </div>
        </div>
    )
}