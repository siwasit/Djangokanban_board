import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'
import './style/component.css'
import dayjs from 'dayjs';
import axios from 'axios';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const TaskCard = (props) => {
  const { body, proj_id } = props 
  const [isClick, setIsClick] = useState(false)

  const handleToggleClick = () => {
    setIsClick((prevState) => !prevState);
  };

  const formattedDate = dayjs(body.dueDate).format('YYYY-MM-DD');
  const handleDelete = async () => {
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await axios.delete(`/api/projects/${proj_id}/${body.id}/`, {
        headers: {
          'X-CSRFToken': csrfToken, // Include the CSRF token in the request headers
          'Content-Type': 'application/json', // Set the content type as needed
        }
      })
      console.log(response)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <>
        <div className="mb-2 rounded bg-light rounded-left" data-id = {body.id} data-carddetail={JSON.stringify(body)}>
          <button className="btn btn-toggle p-1 d-flex gap-3 w-100 align-items-center collapsed" onClick={() => handleToggleClick()} data-bs-toggle="collapse" data-bs-target={`#${body.id}`} aria-expanded="false">
            { isClick ? <FontAwesomeIcon icon={faCaretUp} size='lg'/> : <FontAwesomeIcon icon={faCaretDown} size='lg'/>}
            <div style={{position:'relative'}}>
              <u>{body.cardTitle}</u>
            </div>
          </button>
          <div className="collapse w-100" id={`${body.id}`}>
            <div className='p-3 w-100'>
              <div className='border-top'>
                {body.description}
              </div>
              <div className='text-center border-top'>
                Deadline: {formattedDate}
              </div>
            </div>
            <div className='d-flex justify-content-center w-100'>
              <button onClick={handleDelete} className='bg-danger border border-0 roun w-75 rounded-top' style={{height:'.5rem'}}></button>
            </div>
          </div>
        </div>
      </>
    );
  };

export default TaskCard