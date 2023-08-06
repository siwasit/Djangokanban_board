import React, {useState, useEffect} from 'react'
import './page_style/page.css'
import Footer from '../components/footer'
import LoginPage from './login'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

function RegisterPage() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [accept, setAccept] = useState(false);

    const handleAcceptClick = () => {
        setAccept(!accept);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(values)
        try {
            const response = await axios.post('/api/register/', values);
            console.log(response.data)
        } catch (error) {
            console.error(error);
            // Handle error, e.g., display an error message
        }
    };

    const [disableBtn, setDisableBtn] = useState(true)
    useEffect(() => {
        const ValidArr = []
        for (const key in values) {
            ValidArr.push(values[key].length > 0)
        }
        const IsValid = ValidArr.every(item => item);
        setDisableBtn(!(accept && IsValid))
    }, [accept, values])
  return (
    <>
        <div className='backgroudContainer vh-100 d-flex align-items-center justify-content-center'>
            <div className='w-75 d-flex rounded' style={{height: '80%'}}>
                <div className='imageCap rounded-start bg-light w-50'>
                    <div className='layer rounded-start w-100 h-100'></div>
                    <div style={{zIndex: '0', position: 'absolute', bottom: '0', right: '50%', transform: 'translateX(50%)'}}>
                        <div className='Brand px-2 rounded-top bg-light d-flex align-items-center justify-content-center gap-1'>
                            <div><FontAwesomeIcon icon={faMap} style={{color: '#d63384'}} size='2xl' /></div>
                            <div className='Tham-kanban'>Tham-kanban</div>
                        </div>
                    </div>
                </div>

                <div className='bg-light rounded-end w-50 h-100 pt-3' style={{fontFamily: 'Bai Jamjuree, sans-serif'}}>
                    <ul className="nav nav-tabs d-flex justify-content-end" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link text-dark active" data-bs-toggle="tab" href="#Register">ลงทะเบียน</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-dark" data-bs-toggle="tab" href="#Login">เข้าสู่ระบบ</a>
                        </li>
                    </ul>

                    <div className='tab-content'>
                        <form className="bg-light p-3 rounded tab-pane active" id='Register' onSubmit={handleSubmit}>
                            <div className="mb-3 h2 text-center"><strong>ลงทะเบียน</strong></div>
                            <div className="mb-3">
                                <label htmlFor="name">ชื่อผู้ใช้</label>
                                <input className="form-control" type="text" placeholder="Enter Name" onChange={event => setValues({...values, username: event.target.value})} name="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">อีเมลล์</label>
                                <input className="form-control" type="email" placeholder="Enter Email" onChange={event => setValues({...values, email: event.target.value})} name="email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">รหัสผ่าน</label>
                                <input className="form-control" type="password" placeholder="Set Your Password" onChange={event => setValues({...values, password: event.target.value})} name="password" />
                            </div>
                            <div className="mb-3">
                                <input type="checkbox" className="form-check-input mx-1" onClick={handleAcceptClick}/>
                                <label className="form-check-label" htmlFor="confirm">คุณเห็นด้วยกับนโยบายและข้อกำหนดของเรา</label>
                            </div>
                            <div>
                                <button type="submit" className="form-control btn btn-primary" disabled={disableBtn}>ลงทะเบียน</button>
                            </div>
                        </form>
                        <div className='tab-pane fade' id='Login'>
                            <LoginPage />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </>
  )
}

export default RegisterPage