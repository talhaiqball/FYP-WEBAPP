import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import IncompleteGroups from './IncompleteGroups';
import RemainingStudents from './RemainingStudents';

const GroupAdjustment = () => {

    return (
        <div className='container'>
            <div className='shadow-lg p-3 col-md-12  mb-5 mt-5 bg-body rounded' style={{ width: '100%' }}>
                <IncompleteGroups />
                <hr/>
                <RemainingStudents />
            </div>
        </div>
    );
};

export default GroupAdjustment;
