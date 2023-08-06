import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style/component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import axios from 'axios'

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const CardProject = (props) => {
  const { data } = props
  const [dataUse, setDataUse] = useState([])
  const csrfToken = getCookie('csrftoken');

  const [isEdit, setIsEdit] = useState(true)
  const handleEdit = () => {
    setIsEdit((prevState) => !prevState);
  };

  // console.log(data !== undefined, data)
  const [status, setStatus] = useState('On-going')
  const [createdAt, setCreatedAt] = useState('')
  useEffect(() => {
    const date = dataUse.createdAt
    const parsedDate = dayjs(date)
    if (dataUse.status == true) {
      setStatus('Completed')
    }
    
    setCreatedAt(parsedDate.format('YYYY-MM-DD'))

  }, [dataUse])

  useEffect(() => {
    if (data !== undefined) {
      setDataUse(data)
      // console.log(data)
    }
  }, [data]);

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`/api/${dataUse.id}`, {
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

    alert('Data changed successfully!')
    setIsEdit(true)
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/${dataUse.id}`, {
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
        <div className="card p-3" style={{height: '20rem', width:'15rem', position:'relative'}}>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div className="ms-2 c-details">
                <div className="d-flex gap-2 h6 mb-0" style={{position:'relative'}}>
                  {dataUse.owner}
                  <div style={{cursor: 'pointer'}} onClick={handleEdit}><FontAwesomeIcon icon={faGear} size='sm'/></div>
                </div>
                <div className='d-flex gap-3'>
                  <span>#{dataUse.id}</span>
                  <span>{createdAt}</span>
                </div> 
              </div>
            </div>
            <div className={`badge d-flex align-items-start ${status}`}> 
              <span className=''>{status}</span> 
            </div>
          </div>
          {isEdit ?
          <div className="mt-1 d-flex flex-column h-100 w-100" style={{position:"relative"}}>
            <h3 className="heading h-25 text-center border-top"><Link className='text-dark text-decoration-none' to={`/project/${dataUse.id}`}>{dataUse.title}</Link></h3>
            <p className="p-2 h-50 card-text">{dataUse.description}</p>
            <div className='w-100 text-center' style={{position:"absolute", bottom:'0'}}>
              <div className="progress">
                <div className="progress-bar progress-bar-striped" role="progressbar" style={{width: "100%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div> <span className="text1">in coming!<span className="text2">ครับผม</span></span> </div>
            </div>
          </div> : 
          <div className="mt-1 h-100 w-100 border-top">
            <form className='d-flex flex-column' onSubmit={handleEditSubmit}>
              <div>
                <label htmlFor="ProjectName" className="form-label">Project name</label>
                <input type="text" className="form-control" onChange={event => setDataUse({...dataUse, title: event.target.value})} id="ProjectName" aria-describedby="ProjectName"/>
              </div>
              <div className='mb-3'>
                <label htmlFor="description" className="form-label">description</label>
                <textarea className="form-control" onChange={event => setDataUse({...dataUse, description: event.target.value})} style={{height: "5rem"}} id="description" rows="5"></textarea>
              </div>
              <button className='btn btn-success d-flex justify-content-center align-items-center' style={{height:'2rem'}}>Confirm</button>
            </form>
          </div>
          }
          <button onClick={handleDelete} className='bg-danger border border-0 rounded-top' style={{ position: "absolute", bottom: '0', height: '3%', width: '75%', left: '0', right: '0', margin: 'auto' }}></button>
        </div>
    </>
  )
}

export default CardProject