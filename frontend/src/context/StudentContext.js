import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const StudentContext = createContext(null);

const StudentProvider = ({ children }) => {
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
      axios.get(`http://localhost:3001/getStudentInfo/${userid}`)
        .then(response => {
          const userData = response.data;
          localStorage.setItem('isLeader',userData?.isLeader);
          if (
            userData.hasOwnProperty('CGPA') && 
            userData.hasOwnProperty('interests') && 
            userData.hasOwnProperty('skills') && 
            userData.hasOwnProperty('freeslots')
          ) {
            if (
              userData.CGPA !== null && 
              userData.interests !== null &&
              userData.skills !== null &&
              Array.isArray(userData.freeslots) && 
              userData.freeslots.length > 0
            ) {
              setProfileCompleted(true);
            } else {
              setProfileCompleted(false);
            }
          } else {
            console.error('CGPA or freeslots attribute not found in response data.');
          }
          
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
    <StudentContext.Provider value={{ userid, profileCompleted, resetPassword, setProfileCompleted, setResetPassword, updateUserId, updateResetPassword }}>
      {children}
    </StudentContext.Provider>
  );
};

export { StudentProvider, StudentContext };