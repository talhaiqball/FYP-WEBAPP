import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import blueCreateGroup from '../../../images/whiteCreateGroup.png';
import whiteCreateGroup from '../../../images/blueCreateGroup.png';
import blueRequest from '../../../images/blueRequest.png';
import whiteRequest from '../../../images/whiteRequest.png';
import './GroupFormation.css';
import CreateGroup from './CreateGroup/CreateGroup';

const GroupFormation = () => {
    const [createGroup, setCreateGroup] = useState(false);
    const [request, setRequest] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);

    const handleShowPrompt = (event) => {
        event.preventDefault();
        setShowPrompt(true);
    }

    const handleCancel = () => {
        setShowPrompt(false);
    }
    
    return (
        <div className='container d-flex justify-content-center align-items-center'>
            <div className='row mt-5'>
                <div className='col-md-auto'>
                    <Link to={`/`} className='card-link' onClick={handleShowPrompt}>
                        <Card className={createGroup ? "shadow card-container hovered" : "shadow card-container"}
                            style={{ width: '190px', height: '130px' }}
                            onMouseEnter={() => setCreateGroup(true)}
                            onMouseLeave={() => setCreateGroup(false)}
                        >
                            <Card.Body>
                                <img
                                    src={createGroup ? whiteCreateGroup : blueCreateGroup}
                                    alt="Create Group Logo"
                                    className='card-image'
                                />
                                <div>
                                    <span className="custom-button">Create Group</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>
                <div className='col-md-auto'>
                        <Link to={`/student/ViewRequestsByStudent`} className='card-link'>
                        <Card className={request ? "shadow card-container hovered" : "shadow card-container"}
                        style={{ width: '190px', height: '130px' }}
                        onMouseEnter={() => setRequest(true)}
                        onMouseLeave={() => setRequest(false)}>
                        <Card.Body>
                            <img
                                src={request ? blueRequest : whiteRequest}
                                alt="Requests Logo"
                                className='card-image'
                            />
                            <div>
                                <span className="custom-button">Request</span>
                            </div>
                            </Card.Body>
                        </Card>
                    </Link>
                </div>

                <CreateGroup
                    show={showPrompt}
                    onHide={handleCancel}
                />
            </div>
        </div>
    )
}

export default GroupFormation;
