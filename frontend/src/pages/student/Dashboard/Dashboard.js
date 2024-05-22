import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentContext } from '../../../context/StudentContext';

function Dashboard() {
    const { userid, profileCompleted, resetPassword} = useContext(StudentContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (resetPassword !== null) {
            if (resetPassword === true) {
                navigate(`/student/ChangePassword/${userid}`);
            } else if (!profileCompleted) {
                navigate(`/student/EditProfile/${userid}`);
            }
        }
    }, [userid, profileCompleted, resetPassword, navigate]);

    return (
        <div>
            {/* Add loading indicator or message here if needed */}
        </div>
    );
}

export default Dashboard;
