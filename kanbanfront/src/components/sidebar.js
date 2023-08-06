import React, {useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserContext from '../userContext'
import { faCaretLeft, faCaretDown, faCaretRight, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import './style/component.css'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

const ProjectSidebar = () => {
    const { userData } = useContext(UserContext);
    const [projectData, setProjectData] = useState([])
    const [isShow, setIsShow] = useState(true);
    const [isClick, setIsClick] = useState({
        first: false,
        second: false,
        third: false,
    })

    const handleSidebarToggle = () => {
      setIsShow((prevState) => !prevState);
    };

    const navigate = useNavigate()
    const handleLogout = () => {
        try {
            axios.get('/api/logout/');
            navigate('/')
            localStorage.clear()
        } catch (error) {
            console.error(error);
          // Handle error, e.g., display an error message
        }
    };
    
    const [card, setCard] = useState([])
    useEffect(() => {
    const fetchProj = async () => {
        try {
        const response = await axios.get('/api/projects/');
        if (response.data !== undefined) {
            setProjectData(response.data)
            // console.log(data)
        }
        } catch (error) {
        console.log(error)
        }

        try {
        const response = await axios.get(`/api/user/${userData.id}/card/`);
        console.log(response)
        if (response.data !== undefined) {
            setCard(response.data.cards)
            // console.log(data)
        }
        } catch (error) {
        console.log(error)
        }
    }
    
        fetchProj()
        console.log(card)
    }, [])

    const handleToggleClick = (propertyName) => {
        setIsClick((prevState) => ({
          ...prevState,
          [propertyName]: !prevState[propertyName],
        }));
    };

    return (
        <>  
        {
            isShow ? 
            <div className="flex-shrink-0 bg-white h-100 sidebar-expanded" style={{position:'relative'}}>
                <div className="d-flex align-items-center justify-content-between p-3 mb-3 link-dark text-decoration-none" style={{height:'auto'}}>
                    <span className="fs-5 fw-semibold">Project Workbench</span>
                    <button className='btn btn-toggle' onClick={handleSidebarToggle} style={{height:'100%'}}>
                        <FontAwesomeIcon icon={faCaretLeft} size='lg'/>
                    </button>
                </div>
                <ul className="list-unstyled border-top pt-3 mx-3">
                    <li className="mb-1">
                        <button className="btn btn-toggle d-flex gap-3 w-100 align-items-center rounded collapsed" onClick={() => handleToggleClick('first')} data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="false">
                            { isClick.first ? <FontAwesomeIcon icon={faCaretUp} size='lg'/> : <FontAwesomeIcon icon={faCaretDown} size='lg'/>}
                            <div className='d-flex align-items-center gap-2' style={{position:'relative'}}>
                                <div>Project</div>
                                <div className='taskAmount bg-secondary d-flex align-items-center justify-content-center text-light' style={{fontSize:'90%'}}>{projectData.length}</div>
                            </div>
                        </button>
                        <div className="collapse" id="home-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{paddingLeft: '2rem'}}>
                            {projectData.map((projectDetail) => (
                                <li><Link to={`/project/${projectDetail.id}`} className="link-dark rounded">{projectDetail.title}</Link></li>
                            ))}
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className="btn btn-toggle d-flex gap-3 w-100 align-items-center rounded collapsed" onClick={() => handleToggleClick('second')} data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            { isClick.second ? <FontAwesomeIcon icon={faCaretUp} size='lg'/> : <FontAwesomeIcon icon={faCaretDown} size='lg'/>}
                            <div className='d-flex align-items-center gap-2' style={{position:'relative'}}>
                                <div>Work Remaining</div>
                                <div className='taskAmount bg-danger d-flex align-items-center justify-content-center text-light' style={{fontSize:'90%'}}>{card.length}</div>
                            </div>
                        </button>
                        <div className="collapse" id="dashboard-collapse">
                            <ul className="btn-toggle-nav fw-normal pb-1 small" style={{paddingLeft: '2rem'}}>
                                {card.map((cardDetail) => (
                                    <li key={cardDetail.id}><Link to={`/project/${cardDetail.propertyOf}`} className="link-dark rounded">{cardDetail.cardTitle}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    <li className="border-top my-3"></li>
                    
                    <li className="mb-1">
                        <button className="btn btn-toggle d-flex gap-3 w-100 align-items-center rounded collapsed" onClick={() => handleToggleClick('third')} data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                            { isClick.third ? <FontAwesomeIcon icon={faCaretUp} size='lg'/> : <FontAwesomeIcon icon={faCaretDown} size='lg'/>}
                            <div>About you</div>
                        </button>
                        <div className="collapse" id="account-collapse">
                            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small" style={{paddingLeft: '2rem'}}>
                                <li><div className="link-dark rounded">Username: <strong>{userData.username}</strong></div></li>
                                <li><div className="link-dark rounded">Email: <strong>{userData.email}</strong></div></li>
                                <li><div className="link-dark rounded">Project own: <strong>{projectData.length}</strong></div></li>
                                <li><div className="link-dark rounded">Task remaining: <strong>{card.length}</strong></div></li>
                            </ul>
                        </div>
                    </li>
                </ul>

                <div className='px-3 w-100 pb-3' style={{position:'absolute', bottom:'0'}}>
                    <div className="border-top my-3"></div>
                    <button className='btn' onClick={handleLogout}>Sign out</button>
                </div>
            </div> : 
            <div className="flex-shrink-0 bg-white h-100 sidebar-collapsed py-3" style={{width: '2.5rem'}}>
                <button className='btn btn-toggle' onClick={handleSidebarToggle}>
                    <FontAwesomeIcon icon={faCaretRight} size='lg'/>
                </button>
            </div>
        }
        </>
    )
}

export default ProjectSidebar