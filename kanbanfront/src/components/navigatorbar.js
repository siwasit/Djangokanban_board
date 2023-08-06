import React from 'react'
import './style/component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Navigatorbar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light d-flex justify-content-between px-3">
        <a className='navbar-brand d-flex align-items-center gap-2' href='/'>
            <div><FontAwesomeIcon icon={faMap} style={{color: '#d63384'}} /></div>
            <div>Tham-kanban</div>
        </a>
        
        <ul className="navbar-nav d-flex gap-3">
            <li className="nav-item active">
                <Link className="nav-link" to='/project'>รันงานต่อ</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">ฟีเจอร์</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">เกี่ยวกับเรา</a>
            </li>
            <li className="nav-item">
                <Link className='btn btn-success' to='/authorize'>ลองใช้ฟรี</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navigatorbar