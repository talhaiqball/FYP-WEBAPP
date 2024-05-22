import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoordinatorContext } from '../../../context/CoordinatorContext';
import FailureMessage from '../../../components/Alert/FailureMessage';
import ErrorMessage from '../../../components/Alert/ErrorMessage';
import axios from 'axios';

const ChangePassword = () => {
    const { userid, updateResetPassword,resetPassword } = useContext(CoordinatorContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reTypePassword, setReTypePassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newPassword !== reTypePassword) {
                setAlertMessage("New Passwords do not match.");
                setTimeout(() => {
                    setAlertMessage('');
                }, 6000);
                return;
            }

            // Password length check
            if (newPassword.length < 8) {
                setErrorMessage("Password must be at least 8 characters long.");
                return;
            }

            // Password complexity check
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
                return;
            }

            // Password similarity check
            if (oldPassword === newPassword) {
                setErrorMessage("New password must be different from the old password.");
                return;
            }

            const response = await axios.patch(`http://localhost:3001/changePasswordCoordinator/${userid}`, {
                oldPassword: oldPassword,
                newPassword: newPassword
            });
            console.log(response.data);
            if (resetPassword) {
                updateResetPassword(false);
                navigate(`/coordinator/Dashboard/${userid}`);
            } else {
                navigate(-1);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className='container'>
            <div className="shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-gred text-center">
                        <h2><b>Change Password</b></h2>
                    </div>
                    <div className="col-sm-3 mb-4 mt-3 text-end">
                        <button
                            className="btn-close"
                            onClick={handleGoBack}
                            style={{ marginRight: '1rem' }}
                        />
                    </div>
                </div>
                {alertMessage && <FailureMessage alert={alertMessage} />}
                <form onSubmit={handleSubmit} style={{ paddingLeft: '50px' }}>
                    <div className="form-group row">
                        <div className="col-sm-3 pt-2">
                            <label htmlFor="oldPassword">Old Password</label>
                        </div>
                        <div className="col-sm-6">
                            <input type="password" className="form-control form-control-sm p-2" id="oldPassword" onChange={(event) => setOldPassword(event.target.value)} />
                        </div>
                    </div>
                    <div className="form-group row pt-3">
                        <div className="col-sm-3 pt-2">
                            <label htmlFor="newPassword">New Password</label>
                        </div>
                        <div className="col-sm-6">
                            <input type="password" className="form-control form-control-sm p-2" id="newPassword" onChange={(event) => setNewPassword(event.target.value)} />
                            <ErrorMessage alert={errorMessage}/>
                        </div>
                    </div>
                    <div className="form-group row pt-3">
                        <div className="col-sm-3 pt-2">
                            <label htmlFor="reTypePassword">Re-type Password</label>
                        </div>
                        <div className="col-sm-6">
                            <input type="password" className="form-control form-control-sm p-2" id="reTypePassword" onChange={(event) => setReTypePassword(event.target.value)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn mt-3 mb-3" style={{ backgroundColor: '#0496FF', color: 'white' }}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;