import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CoordinatorContext } from '../../../context/CoordinatorContext';
import ErrorMessage from '../../../components/Alert/ErrorMessage';

function EditProfile() {
    const { userid } = useContext(CoordinatorContext);
    const navigate = useNavigate();
    const location = useLocation();
    const coordinator = location.state.coordinator;
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: coordinator.name || '',
        email: coordinator.email || ''
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
        if (id === 'email') {
            setErrorMessage('');
            if (value && !validateEmail(value)) {
                setErrorMessage("Only @gift.edu.pk email addresses are acceptable.");
            }
        }
    };

    useEffect(() => {
        setIsFormValid(formData.name.trim() !== '' && formData.email.trim() !== '');
    }, [formData]);

    const validateEmail = (email) => {
        const domain = '@gift.edu.pk';
        return email.endsWith(domain);
    };

    const handleSave = async () => {
        if (!validateEmail(formData.email)) {
            setErrorMessage("Only @gift.edu.pk email addresses are acceptable.");
            return;
        }

        try {
            await axios.post(`http://localhost:3001/editCoordinatorInfo/${userid}`, formData);
            navigate(`/coordinator/ViewProfile/${userid}`);
        } catch (error) {
            console.error('Error updating coordinator info:', error);
        }
    };

    return (
        <div className='container'>
            <div className="shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-gred text-center">
                        <h2><b>Edit Profile</b></h2>
                    </div>
                    <div className="col-sm-3 mb-4 mt-3 text-end">
                        <button
                            className="btn-close"
                            onClick={handleGoBack}
                            style={{ marginRight: '1rem' }}
                        />
                    </div>
                </div>
                <div className='row'>
                    <form style={{ paddingLeft: '50px' }}>
                        <div className='form-group row pt-3'>
                            <div className='col-sm-8 offset-md-2'>
                            </div>
                        </div>
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="name" className="col-form-label">Name</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm p-2" id="name" value={formData.name} onChange={handleChange} required/>
                            </div>
                        </div>
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="email" className="col-form-label">Email</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="email" className="form-control form-control-sm p-2" id="email" value={formData.email} onChange={handleChange} required/>
                                <ErrorMessage alert={errorMessage}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <button 
                                type="button" 
                                className="btn mt-3 mb-3" 
                                style={{ backgroundColor: '#0496FF', color: 'white' }} 
                                onClick={handleSave}
                                disabled={!isFormValid}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
