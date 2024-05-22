import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userid, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userid');
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  const [profileCompleted, setProfileCompleted] = useState(false);
  const [resetPassword, setResetPassword] = useState(null);

  useEffect(() => {
    localStorage.setItem('userid', JSON.stringify(userid));
  }, [userid]);

  const updateUserId = (newUserId) => {
    setUserId(newUserId);
  };

  useEffect(() => {
    if (userid) {
      axios.get(`http://localhost:3001/checkPanelMemberProfileCompletion/${userid}`)
        .then(response => {
          setProfileCompleted(response.data.profileCompleted);
        })
        .catch(error => {
          console.error('Error checking profile completion:', error);
        });

      axios.get(`http://localhost:3001/getPanelMemberInfo/${userid}`)
        .then(response => {
          const userData = response.data;
          if (userData.hasOwnProperty('resetPassword')) {
            setResetPassword(userData.resetPassword);
          } else {
            console.error('Reset password attribute not found in response data.');
          }
        })
        .catch(error => {
          console.error('Error fetching panel member info:', error);
        });
    }
  }, [userid]);

  const updateResetPassword = () => {
    setResetPassword(true);
  };

  return (
    <UserContext.Provider value={{ userid, profileCompleted, resetPassword, setProfileCompleted, setResetPassword, updateUserId, updateResetPassword }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };