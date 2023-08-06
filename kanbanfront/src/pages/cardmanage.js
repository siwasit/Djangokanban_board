import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import dragula from 'react-dragula';
import TaskCard from '../components/taskcard';
import 'dragula/dist/dragula.min.css'; // Import the dragula CSS
import ProjectSidebar from '../components/sidebar'
import './page_style/page.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const TaskManagement = () => {
  const { proj_id } = useParams()
  const leftContainerRef = useRef(null);
  const leftMiddleContainerRef = useRef(null);
  const rightMiddleContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const [cardData, setCardData] = useState([])

  const updateTask = async (cardId, taskCard) => {
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.put(`/api/projects/${proj_id}/${cardId}/`, taskCard, {
        headers: {
          'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
          'Content-Type': 'application/json', // Set the content type as needed
        },
      })
      console.log(response)
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display an error message
    }
  }

  useEffect(() => {
    // Initialize dragula with the containers
    const drake = dragula([leftContainerRef.current, leftMiddleContainerRef.current, rightMiddleContainerRef.current, rightContainerRef.current]);

    // Add event listener for drop event
    drake.on('drop', (draggedElement, target, source) => {
      // Get the card's ID from the data-id attribute of the draggedElement
      const cardId = draggedElement.getAttribute('data-id');
      const cardDetailString = draggedElement.getAttribute('data-carddetail')
      const cardDetail = JSON.parse(cardDetailString);

      // Get the space name from the target element's id
      const targetSpace = target.id;
      cardDetail.taskStatus = targetSpace;
      updateTask(cardId, cardDetail)
      // Update the card's status based on the target space

      // Log the updated cardData (it will reflect the changes)
    });

    // Don't forget to remove the dragula instance on unmount
    return () => {
      drake.destroy();
    };


  }, []);

  const fetchCard = async () => {
    try {
      const response = await axios.get(`/api/projects/${proj_id}/`);
      console.log(response)
      if (response.data !== undefined) {
        setCardData(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchCard()
  }, [])

  console.log(cardData)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prevIsModalOpen) => !prevIsModalOpen);
    console.log(isModalOpen)
  };

  const [values, setValues] = useState({
    "propertyOf": proj_id,
    "cardTitle": "",
    "description": "",
    "createdAt": dayjs(),
    "dueDate": '',
    "taskStatus": 'Backlog'
  })

  const hadleSubmit = async (event) => {
    event.preventDefault()
    const csrfToken = getCookie('csrftoken');
    console.log(values)
    try {
      const response = await axios.post(`/api/projects/${proj_id}/`, values, {
        headers: {
          'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
          'Content-Type': 'application/json', // Set the content type as needed
        },
      })
      console.log(response)
      window.location.reload()
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display an error message
    }
  }

  return (
    <>
      <div className='vh-100 d-flex' style={{backgroundColor:'#d2d2d2', position:'relative'}}>
        <ProjectSidebar />
        <div className='tcm-main-content w-100 h-100' style={{position:'relative'}}>
          {/* project-id: {proj_id} */}
          {/* <div className='light-overlay'></div> */}
          <div className="container h-100 align-items-center w-100 p-4 d-flex justify-content-between gap-4" style={{position:'relative', zIndex:'2'}}>
            <div className='flex-column justify-content-center'>
              <div className='glass p-1 rounded rounded-top text-center h3' style={{fontSize:'150%'}}>Backlog</div>
              <div className='glass scrollable' style={{height:'35rem'}}>
                <div id='Backlog' ref={leftContainerRef} className="p-3 container" style={{width:'15rem'}}>
                  {cardData.map((cardDetail) => {
                    // console.log(cardDetail.taskStatus === "Backlog")
                    if (cardDetail.taskStatus === "Backlog"){
                      return <TaskCard key={cardDetail.id} body={cardDetail} data-id={cardDetail.id} proj_id={proj_id}/>
                    }
                  })}
                </div>
                <div className='d-flex justify-content-center align-items-center ' style={{width:'15rem'}}>
                  <button onClick={toggleModal} className='d-flex btn justify-content-center align-items-center bg-success bg-opacity-75 py-1 rounded-circle' style={{width:'2rem', height:'2rem'}}>
                    <FontAwesomeIcon icon={faPlus} size='1x' color='rgba(255, 255, 255)' />
                  </button>
                </div>
              </div>
            </div>
            <div className='flex-column justify-content-center'>
              <div className='glass p-1 rounded rounded-top text-center h3' style={{fontSize:'150%'}}>Doing</div>
              <div className='glass'>
                <div id='Doing' ref={leftMiddleContainerRef} className="p-3 scrollable container" style={{width:'15rem', height:'35rem'}}>
                  {cardData.map((cardDetail) => {
                    // console.log(cardDetail.taskStatus === "Backlog")
                    if (cardDetail.taskStatus === "Doing"){
                      return <TaskCard body={cardDetail} proj_id={proj_id} />
                    }
                  })}
                </div>
              </div>
            </div>
            <div className='flex-column justify-content-center'>
              <div className='glass p-1 rounded rounded-top text-center h3' style={{fontSize:'150%'}}>Testing</div>
              <div className='glass'>
                <div id='Testing' ref={rightMiddleContainerRef} className="p-3 scrollable container" style={{width:'15rem', height:'35rem'}}>
                  {cardData.map((cardDetail) => {
                    // console.log(cardDetail.taskStatus === "Backlog")
                    if (cardDetail.taskStatus === "Testing"){
                      return <TaskCard body={cardDetail} proj_id={proj_id} />
                    }
                  })}
                </div>
              </div>
            </div>
            <div className='flex-column justify-content-center'>
              <div className='glass p-1 rounded rounded-top text-center h3' style={{fontSize:'150%'}}>Done</div>
              <div className='glass'>
                <div id='Completed' ref={rightContainerRef} className="p-3 scrollable container" style={{width:'15rem', height:'35rem'}}>
                  {cardData.map((cardDetail) => {
                    // console.log(cardDetail.taskStatus === "Backlog")
                    if (cardDetail.taskStatus === "Completed"){
                      return <TaskCard body={cardDetail} proj_id={proj_id} />
                    }
                  })} 
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
        <div className="light-modal-overlay bg-dark bg-opacity-75 d-flex justify-content-center align-items-center">
          <div className="bg-light p-3 rounded w-25">
            <h3 className="mb-4">Create Task Card</h3>
            <form onSubmit={hadleSubmit}>
              <div className="mb-3">
                <label htmlFor="cardTitle" className="form-label">
                  Card Title
                </label>
                <input type="text" className="form-control" onChange={event => setValues({...values, cardTitle: event.target.value})} id="cardTitle" placeholder="Enter card title" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea className="form-control" onChange={event => setValues({...values, description: event.target.value})} id="description" rows="5" placeholder="Enter description"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <input type="date" onChange={event => setValues({...values, dueDate: event.target.value})} className="form-control" id="dueDate" />
              </div>
              <div className="d-flex gap-3 justify-content-end mt-4">
                <button type="button" className="btn btn-danger" onClick={toggleModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary mr-2">
                  Create Card
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
      </div>
    </>
  )
}

export default TaskManagement