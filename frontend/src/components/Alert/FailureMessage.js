import React, { useEffect } from 'react';

const FailureMessage = ({ alert, onClose }) => {
//   useEffect(() => {
//     const handleClose = () => {
//       onClose();
//     };

//     const closeButton = document.querySelector('.btn-close');
//     closeButton.addEventListener('click', handleClose);

//     return () => {
//       closeButton.removeEventListener('click', handleClose);
//     };
//   }, [onClose]);

  return (
    <div 
      className="alert alert-danger alert-dismissible fade show" 
      role="alert" 
      style={{fontSize:'14px'}}
    >
      {alert}
      {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button> */}
    </div>
  );
};

export default FailureMessage;
