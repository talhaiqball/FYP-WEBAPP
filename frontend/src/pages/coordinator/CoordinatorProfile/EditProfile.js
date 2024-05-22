import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CoordinatorContext } from '../../../context/CoordinatorContext';

function EditProfile() {
    const { userid } = useContext(CoordinatorContext);
    const navigate = useNavigate();
    const [coordinator, setCoordinator] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleGoBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const fetchCoordinatorInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getCoordinatorInfo/${userid}`);
                setCoordinator(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email
                });
            } catch (error) {
                console.error('Error fetching coordinator:', error);
            }
        };

        fetchCoordinatorInfo();
    }, [userid]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`http://localhost:3001/editCoordinatorInfo/${userid}`, formData);
            navigate('/coordinator/ViewProfile/${userid}');
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
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="name" className="col-form-label">Name</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm p-2" id="name" value={formData.name} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="email" className="col-form-label">Email</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="email" className="form-control form-control-sm p-2" id="email" value={formData.email} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn mt-3 mb-3" style={{ backgroundColor: '#0496FF', color: 'white' }} onClick={handleSubmit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;