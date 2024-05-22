import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'; // Assuming you're using FontAwesome icons
import IncompleteGroups from './IncompleteGroups';
import RemainingStudents from './RemainingStudents';

const GroupAdjustment = () => {

    const [showIncompleteGroups, setShowIncompleteGroups] = useState(false);
    const [showRemainingStudents, setShowRemainingStudents] = useState(false);

    const toggleIncompleteGroups = () => {
        setShowIncompleteGroups(!showIncompleteGroups);
    };

    const toggleRemainingStudents = () => {
        setShowRemainingStudents(!showRemainingStudents);
    };


    return (
        // <div className='container'>
        //     <div className='shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded' style={{ width: '100%' }}>
        //         <div className="dropdown">
        //             <span onClick={toggleIncompleteGroups} style={{ cursor: 'pointer' }}>
        //                 Incomplete Groups <FontAwesomeIcon icon={showIncompleteGroups ? faAngleUp : faAngleDown} />
        //             </span>
        //             {showIncompleteGroups && <IncompleteGroups />}
        //         </div>
        //         <hr />
        //         <div className="dropdown">
        //             <span onClick={toggleRemainingStudents} style={{ cursor: 'pointer' }}>
        //                 Remaining Students <FontAwesomeIcon icon={showRemainingStudents ? faAngleUp : faAngleDown} />
        //             </span>
        //             {showRemainingStudents && <RemainingStudents />}
        //         </div>
        //     </div>
        // </div>
        <div className='container'>
            <div className='shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded' style={{ width: '100%' }}>
                <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                                Incomplete Groups
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div className="accordion-body">
                                <IncompleteGroups />
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                                Remaining Students
                            </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                            <div className="accordion-body">
                                <RemainingStudents />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default GroupAdjustment;
