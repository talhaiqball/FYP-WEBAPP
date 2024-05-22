import React from 'react';

const SuccessMessage = ({ alert }) => {
  return (
    <div className="alert alert-danger alert-dismissible fade show" role="alert">
      {alert}
    </div>
  );
};

export default SuccessMessage;
