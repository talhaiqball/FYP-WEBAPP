import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { SupervisorContext } from '../../../context/SupervisorContext';

function EditProfile() {

    const { userid } = useContext(SupervisorContext);
    const navigate = useNavigate();
    const [supervisor, setSupervisor] = useState(null);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const [domain, setDomain] = useState('');
    const [recentProjects, setRecentProjects] = useState([]);
    const [ideas, setIdeas] = useState([]);
    const [freeslots, setFreeSlots] = useState([]);

    useEffect(() => {
        const fetchSupervisorInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/getSupervisorInfo/${userid}`);
                setSupervisor(response.data);
                setDomain(response.data.domain);
                setRecentProjects(response.data.recentProjects);
                setIdeas(response.data.ideas);
                setFreeSlots(response.data.freeslots);
            } catch (error) {
                console.error('Error fetching supervisor:', error);
            }
        };

        fetchSupervisorInfo();
    }, [userid]);

    const handleEdit = async () => {
        if (!domain || !recentProjects.every(project => project.trim()) || !ideas.every(idea => idea.trim()) || !freeslots.some(row => row.some(slot => slot === 1))) {
            console.error('Please fill out all fields');
            return;
        }

        try {
            await axios.post(`http://localhost:3001/editSupervisorInfo/${userid}`, {
                freeslots,
                domain,
                ideas,
                recentProjects
            });
            navigate(`/supervisor/ViewProfile/${userid}`);
        } catch (error) {
            console.error('Error updating panel member:', error);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleIdeaChange = (index, event) => {
        const updatedIdeas = [...ideas];
        updatedIdeas[index] = event.target.value;
        setIdeas(updatedIdeas);
    };

    const handleProjectChange = (index, event) => {
        const updatedProjects = [...recentProjects];
        updatedProjects[index] = event.target.value;
        setRecentProjects(updatedProjects);
    };

    const handleSlotClick = (event, rowIndex, columnIndex) => {
        event.preventDefault();

        if (rowIndex < 0 || rowIndex >= 6) {
            console.error('Invalid rowIndex:', rowIndex);
            return;
        }

        if (columnIndex < 0 || columnIndex >= 6) {
            console.error('Invalid columnIndex:', columnIndex);
            return;
        }

        const updatedFreeSlots = [...freeslots.map(row => [...(row || Array(6).fill(0))])];
        if (!updatedFreeSlots[rowIndex]) {
            updatedFreeSlots[rowIndex] = Array(6).fill(0);
        }
        updatedFreeSlots[rowIndex][columnIndex] = updatedFreeSlots[rowIndex][columnIndex] ? 0 : 1;
        setFreeSlots(updatedFreeSlots);
    };

    const deleteLastIdeaField = () => {
        setIdeas(prevIdeas => {
            const updatedIdeas = [...prevIdeas];
            updatedIdeas.pop();
            return updatedIdeas;
        });
    };

    const addIdeaField = () => {
        setIdeas(prevIdeas => {
            const updatedIdeas = [...prevIdeas];
            updatedIdeas.push('');
            return updatedIdeas;
        });
    };


    const deleteLastProjectField = () => {
        setRecentProjects(prevProjects => {
            const updatedProjects = [...prevProjects];
            updatedProjects.pop();
            return updatedProjects;
        });
    };

    const addProjectField = () => {
        setRecentProjects(prevProjects => {
            const updatedProjects = [...prevProjects];
            updatedProjects.push('');
            return updatedProjects;
        });
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
                                <input type="text" className="form-control form-control-sm p-2" id="name" value={supervisor ? supervisor.name : ''} disabled />
                            </div>
                        </div>
                        <div className="form-group row pt-3">
                            <div className="col-sm-2">
                                <label htmlFor="userid" className="col-form-label">User ID</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control form-control-sm p-2" id="userid" value={supervisor ? supervisor.userid : ''} disabled />
                            </div>
                        </div>
                        <div className="form-group row pt-3 mb-3">
                            <div className="col-sm-2">
                                <label htmlFor="domain" className="col-form-label">Domain</label>
                            </div>
                            <div className="col-sm-8">
                                <input type='text' className="form-control form-control-sm p-2" id="domain" value={domain} onChange={e => setDomain(e.target.value)} required />
                            </div>
                        </div>

                        <div className="form-group border shadow-sm rounded pt-3 mb-3 p-3">
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="suggestedIdeas">Suggested Ideas</label>
                                </div>
                            </div>
                            <div className="border rounded mt-3 p-3">
                                <div className="row offset-sm-2">
                                    {ideas.map((idea, index) => (
                                        <div className="col-9 mb-3" key={index}>
                                            <textarea
                                                className="form-control form-control-sm p-2"
                                                id={`suggestedIdeas${index + 1}`}
                                                name="suggestedIdeas"
                                                value={idea}
                                                onChange={(event) => handleIdeaChange(index, event)}
                                                required
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="row offset-sm-2">
                                    <div className="col mb-3 mt-3">
                                        <div className="input-group">
                                            <button type="button" className="btn btn-outline-danger btn-sm" onClick={deleteLastIdeaField}>
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-3 mb-3">
                                <div className="col-auto">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        id="addIdeaBtn"
                                        onClick={addIdeaField}
                                        style={{
                                            color: '#0496FF',
                                            borderColor: '#0496FF',
                                            backgroundColor: 'transparent',
                                            transition: 'background-color 0.3s, color 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#0496FF';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#0496FF';
                                        }}
                                    >
                                        <i className="bi bi-plus-circle"></i> Add Idea
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="form-group border shadow-sm rounded pt-3 mb-3 p-3">
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="previousProjects">Previous Projects</label>
                                </div>
                            </div>
                            <div className="border rounded mt-3 p-3">
                                <div className="row offset-sm-2">
                                    {recentProjects.map((project, index) => (
                                        <div className="col-9 mb-3" key={index}>
                                            <textarea
                                                className="form-control form-control-sm p-2"
                                                id={`previousProject${index + 1}`}
                                                name="previousProjects"
                                                value={project}
                                                onChange={(event) => handleProjectChange(index, event)}
                                                required
                                            />
                                        </div>

                                    ))}
                                </div>
                                <div className="row offset-sm-2">
                                    <div className="col mb-3 mt-3">
                                        <div className="input-group">
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => deleteLastProjectField()}
                                            >
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row mt-3 mb-3">
                                <div className="col-auto">
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary btn-sm"
                                        id="addProjectBtn"
                                        onClick={addProjectField}
                                        style={{
                                            color: '#0496FF',
                                            borderColor: '#0496FF',
                                            backgroundColor: 'transparent',
                                            transition: 'background-color 0.3s, color 0.3s'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = '#0496FF';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = 'transparent';
                                            e.target.style.color = '#0496FF';
                                        }}
                                    >
                                        <i className="bi bi-plus-circle"></i> Add Project
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='form-group row'>
                            <label htmlFor='freeslots'>Free Slots</label>
                            <br /><p style={{ color: 'gray', fontSize: 'small', paddingTop: '2px', fontStyle: 'italic' }}>Please select those slots in which you are free</p>
                            <div className="table-responsive">
                                <Table className='table table-striped table-hover text-center table-sm' style={{ width: '100%' }} required>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            {days.map((day, index) => (
                                                <th key={index}>{day}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {freeslots && [1, 2, 3, 4, 5, 6].map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                <td>{row}</td>
                                                {days.map((_, columnIndex) => {
                                                    const slot = freeslots[rowIndex] ? freeslots[rowIndex][columnIndex] : 0;
                                                    return (
                                                        <td key={columnIndex}>
                                                            <button
                                                                className="btn btn-lg btn-custom"
                                                                style={{ backgroundColor: slot ? '#0496FF' : 'transparent', borderColor: 'lightgray', height: '4vh', width: '4vw' }}
                                                                onClick={(event) => handleSlotClick(event, rowIndex, columnIndex)}
                                                            />

                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            </div>
                        </div>
                        <div className='form-group'>
                            <button type="button" className="btn" style={{ backgroundColor: '#0496FF', color: 'white' }} onClick={handleEdit}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;