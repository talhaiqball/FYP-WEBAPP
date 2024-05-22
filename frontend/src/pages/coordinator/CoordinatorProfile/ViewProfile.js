import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CoordinatorContext } from '../../../context/CoordinatorContext';

function ViewProfile() {

    const { userid } = useContext(CoordinatorContext);
    const navigate = useNavigate();
    const [coordinator, setCoordinator] = useState(null);

    useEffect(() => {
        const fetchCoordinatorInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getCoordinatorInfo/${userid}`);
                setCoordinator(response.data);
            } catch (error) {
                console.error('Error fetching coordinator:', error);
            }
        };

        fetchCoordinatorInfo();
    }, [userid]);

    const handleEdit = () => {
        navigate(`/coordinator/EditProfile/${userid}`,{ state: { coordinator } });
    };

    const handleGoBack = () => {
        navigate(`/coordinator/Dashboard/${userid}`);
    };

    return (
        <div className='container'>
            <div className="shadow-lg p-3 col-md-12 mb-5 mt-5 bg-body rounded">
                <div className="row">
                    <div className="col-sm-6 offset-sm-3 mb-4 mt-2 text-gred text-center">
                        <h2><b>View Profile</b></h2>
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
                    {coordinator && (
                        <form style={{ paddingLeft: '50px' }}>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="name" className="col-form-label">Name</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control form-control-sm p-2" id="name" value={coordinator.name} disabled />
                                </div>
                            </div>
                            <div className="form-group row pt-3">
                                <div className="col-sm-2">
                                    <label htmlFor="email" className="col-form-label">Email</label>
                                </div>
                                <div className="col-sm-8">
                                    <input type="email" className="form-control form-control-sm p-2" id="email" value={coordinator.email} disabled />
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="button" className="btn mt-3 mb-3" style={{ backgroundColor: '#0496FF', color: 'white' }} onClick={handleEdit}>Edit</button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewProfile;