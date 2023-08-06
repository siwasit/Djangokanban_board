import React, { useEffect, useState } from 'react'
import ProjectSidebar from '../components/sidebar'
import CardProject from '../components/card'
import './page_style/page.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import axios from 'axios'

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const ProjectPage = () => {
  const [projectData, setProjectData] = useState([])
  const [addProj, setAddProj] = useState({
    title: '',
    description: '',
    status:false,
    createdAt: dayjs()
  })

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.post("/api/projects/", addProj, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
          'Content-Type': 'application/json', // Set the content type as needed
        },
      })
      console.log(response)
      window.location.reload();
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display an error message
    }
  }

  // const projectData = {id: 1, title: 'Kanban Tutorial', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', progress: 64, status: 'On-going', createdAt: '1 month ago',};
  useEffect(() => {
    const fetchProj = async () => {
      try {
        const response = await axios.get('/api/projects/');
        console.log(response)
        if (response.data !== undefined) {
          setProjectData(response.data)
          // console.log(data)
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchProj()
    console.log(projectData)
  }, [])

  return (
    <>
      <div className='vh-100 d-flex' style={{backgroundColor:'#d2d2d2'}}>
        <ProjectSidebar />
        <div className='pm-main-content w-100' style={{position:'relative'}}>
          <div className='light-overlay'></div>
          <div className='p-4 pt-5 d-flex justify-content-center align-items-center h-100' style={{position:'relative', zIndex:'1'}}>
            <div className="row scrollable h-100 w-100">
              {projectData.map((projectDetail) => (
                <div className="col-3 mb-5 d-flex justify-content-center align-items-center">
                  <CardProject data = {projectDetail} />
                </div>
              ))}
              <div className=" col-3 mb-5 d-flex justify-content-center align-items-center">
                <Link className='AddCircle d-flex justify-content-center align-items-center rounded-circle' style={{height: '15rem', width:'15rem'}} data-bs-toggle="modal" data-bs-target="#AddProject">
                  <FontAwesomeIcon icon={faPlus} size='5x' color='rgba(255, 255, 255, 0.5)' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="AddProject" aria-labelledby="AddProjectLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="h1 modal-title fs-5" id="AddProjectLabel">Craete Project</div>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="ProjectName" className="form-label">Project name</label>
                  <input type="text" className="form-control" onChange={event => setAddProj({...addProj, title: event.target.value})} id="ProjectName" aria-describedby="ProjectName" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">description</label>
                  <textarea className="form-control" onChange={event => setAddProj({...addProj, description: event.target.value})} id="description" rows="5"></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Create</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectPage