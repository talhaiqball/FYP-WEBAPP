import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CoordinatorContext = createContext(null);

const CoordinatorProvider = ({ children }) => {
  const [userid, setUserId] = useState(() => {
    const storedUserId = localStorage.getItem('userid');
    return storedUserId ? JSON.parse(storedUserId) : null;
  });

  const [resetPassword, setResetPassword] = useState(null);

  useEffect(() => {
    localStorage.setItem('userid', JSON.stringify(userid));
  }, [userid]);

  const updateUserId = (newUserId) => {
    setUserId(newUserId);
  };

  useEffect(() => {
    if (userid) {
      axios.get(`http://localhost:3001/getCoordinatorInfo/${userid}`)
        .then(response => {
          const userData = response.data;
          if (userData.hasOwnProperty('resetPassword')) {
            setResetPassword(userData.resetPassword);
          } else {
            console.error('Reset password attribute not found in response data.');
          }
        })
        .catch(error => {
          console.error('Error fetching coordinator info:', error);
        });
    }
  }, [userid]);
  

  const updateResetPassword = () => {
    setResetPassword(true);
  };

  return (
    <CoordinatorContext.Provider value={{ userid, resetPassword, setResetPassword, updateUserId, updateResetPassword }}>
      {children}
    </CoordinatorContext.Provider>
  );
};

export { CoordinatorProvider, CoordinatorContext };