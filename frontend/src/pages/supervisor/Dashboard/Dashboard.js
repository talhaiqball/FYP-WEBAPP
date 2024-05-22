import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SupervisorContext } from '../../../context/SupervisorContext';

export default function Dashboard(){
    const { userid, profileCompleted, resetPassword} = useContext(SupervisorContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (resetPassword !== null) {
            if (resetPassword === true) {
                navigate(`/supervisor/ChangePassword/${userid}`);
            } else if (!profileCompleted) {
                navigate(`/supervisor/EditProfile/${userid}`);
            }
        }
    }, [userid, profileCompleted, resetPassword, navigate]);

    return (
        <div>
            {/* Add loading indicator or message here if needed */}
        </div>
    );
}