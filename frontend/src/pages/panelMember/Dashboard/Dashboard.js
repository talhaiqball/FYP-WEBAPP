import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PanelMemberContext } from '../../../context/PanelMemberContext';

function Dashboard() {
    const { userid, profileCompleted, resetPassword} = useContext(PanelMemberContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (resetPassword !== null) {
            if (resetPassword === true) {
                navigate(`/panelMember/ChangePassword/${userid}`);
            } else if (!profileCompleted) {
                navigate(`/panelMember/EditProfile/${userid}`);
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
