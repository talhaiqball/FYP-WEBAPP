import React from 'react';

const ErrorMessage = ({ alert }) => {
  return (
    <div 
      className="pt-3" 
      role="alert" 
      style={{ color: 'red', fontSize: 'small' }}
    >
      {alert}
    </div>
  );
};

export default ErrorMessage;
