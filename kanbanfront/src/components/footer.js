import React from 'react'
import './style/component.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
  return (
    <div className='bg-dark py-5' style={{height: '20.5rem'}}>
        <div className='container h-75 d-flex justify-content-between align-items-start text-light'>
          <div className='footer-card d-flex align-items-center justify-content-center'>
            <a className='brand d-flex align-items-center gap-3 text-light' href='/' style={{textDecoration: 'none'}}>
              <div><FontAwesomeIcon icon={faMap} style={{color: '#d63384'}} /></div>
              <div>Tham-kanban</div>
            </a>
          </div>
          <div className='footer-card d-flex flex-column align-items-center justify-content-center'>
            <h4>ผู้พัฒนา</h4>
            <ul>
              <li>นายศิวศิษย์ แสงนิกุล</li>
              <li>คณะวิศวกรรมศาตร์ สาขา Software engineer</li>
              <li>รหัสนักศึกษา 6510742155</li>
              <li>มหาวิทยาลัยธรรมศาสตร์</li>
            </ul>
          </div>
          <div className='footer-card d-flex flex-column align-items-center justify-content-center'>
            <h4>รายละเอียด</h4>
            <ul>
              <li>เว็บแอปพลิเคชั่นจัดการงาน</li>
              <li>โดยใช้แนวคิดแบบ kanban เป็นหลักในการทำงาน</li>
              <li>Version 1.0.0 beta</li>
            </ul>
          </div>
          <div className='footer-card d-flex flex-column align-items-center justify-content-center'>
            <h4>เทคโนโลยีที่ใช้</h4>
            <ul>
              <li className='d-flex mb-2'>
                <div className='d-flex align-items-center justify-content-center gap-4'>
                  <img src={require('./static/react.png')} height={30} alt='' />
                  <div>React Js</div>
                </div>
              </li>
              <li className='d-flex mb-2'> 
                <div className='d-flex align-items-center justify-content-center gap-4'>
                  <img src={require('./static/django.png')} height={30} alt='' />
                  <div>Django</div>
                </div>
              </li>
              <li className='d-flex mb-2'> 
                <div className='d-flex align-items-center justify-content-center gap-4'>
                  <img src={require('./static/server.png')} height={30} alt='' />
                  <div>SQLite</div>
                </div>
              </li>
              <li className='d-flex mb-2'> 
                <div className='d-flex align-items-center justify-content-center gap-4'>
                  <img src={require('./static/bootstrap.png')} height={30} alt='' />
                  <div>Bootstrap</div>
                </div>
              </li>
            </ul>
          </div>
          <div className='footer-card d-flex flex-column align-items-center justify-content-center'>
            <h4>อาจารย์</h4>
            <ul>
              <li className='d-flex'>
                <div className='d-flex align-items-center justify-content-center gap-2'>
                  <img src={require('./static/dean.png')} height={40} alt='' />
                  <div>Akkharawoot Takhom</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='container w-100 d-flex justify-content-center mt-2'>
          <hr style={{height: '1px', color: '#d2d2d2', width: '75%'}} />
        </div>
        <div className='container d-flex justify-content-center gap-4 text-light'>
            <a href='/'><img src={require('./static/facebook.png')} height={50} alt='' /></a>
            <a href='/'><img src={require('./static/instagram.png')} height={50} alt='' /></a>
            <a href='/'><img src={require('./static/linkedin.png')} height={50} alt='' /></a>
            <a href='/'><img src={require('./static/telegram.png')} height={50} alt='' /></a>
            <a href='/'><img src={require('./static/twitter.png')} height={50} alt='' /></a>
        </div>
    </div>
  )
}

export default Footer