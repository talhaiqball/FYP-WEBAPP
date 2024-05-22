import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const SupervisorContext = createContext(null);

const SupervisorProvider = ({ children }) => {
  const [userid, setUserid] = useState(() => {
    const storedUserId = localStorage.getItem('userid');
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  const [profileCompleted, setProfileCompleted] = useState(false);
  const [resetPassword, setResetPassword] = useState(null);

  useEffect(() => {
    localStorage.setItem('userid', JSON.stringify(userid));
  }, [userid]);

  const updateUserId = (newUserId) => {
    setUserid(newUserId);
  };

  useEffect(() => {
    const fetchSupervisorInfo = async () => {
      try {
        if (userid) {
          const response = await axios.get(`http://localhost:3001/getSupervisorInfo/${userid}`);
          const userData = response.data;

          if (
            userData.hasOwnProperty('domain') &&
            userData.hasOwnProperty('recentProjects') &&
            userData.hasOwnProperty('ideas') &&
            userData.hasOwnProperty('freeslots')
          ) {
            if (
              userData.domain !== null &&
              userData.recentProjects !== null &&
              userData.ideas !== null &&
              Array.isArray(userData.freeslots) &&
              userData.freeslots.length > 0
            ) {
              setProfileCompleted(true);
            } else {
              setProfileCompleted(false);
            }
          } else {
            console.error('Attributes not found in response data.');
          }

          if (userData.hasOwnProperty('resetPassword')) {
            setResetPassword(userData.resetPassword);
          } else {
            console.error('Reset password attribute not found in response data.');
          }
        }
      } catch (error) {
        console.error('Error fetching panel member info:', error);
      }
    };

    fetchSupervisorInfo();
  }, [userid]);

  const updateResetPassword = () => {
    setResetPassword(true);
  };

  return (
    <SupervisorContext.Provider
      value={{
        userid,
        profileCompleted,
        resetPassword,
        setProfileCompleted,
        setResetPassword,
        updateUserId,
        updateResetPassword,
      }}
    >
      {children}
    </SupervisorContext.Provider>
  );
};

export { SupervisorProvider, SupervisorContext };
