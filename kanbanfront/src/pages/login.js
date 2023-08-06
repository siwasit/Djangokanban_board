import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "../userContext";

function LoginPage() {
  const [values, setValues] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const { handleLoginSuccess } = useContext(UserContext)

  // const [disableBtn, setDisableBtn] = useState(true)

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values)
    try {
      const response = await axios.post('/api/login/', values);
      console.log(response.data)
      handleLoginSuccess(response.data)
      navigate('/project')
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
      setDisableBtn(!IsValid)
  }, [values])

  return (
    <form className="bg-light p-3 rounded tab-pane" onSubmit={handleSubmit}>
      <div className="mb-3 h2 text-center"><strong>เข้าสู่ระบบ</strong></div>
      <div className="mb-3">
          <label htmlFor="email">อีเมล์</label>
          <input className="form-control" type="email" placeholder="Enter Email" onChange={event => setValues({...values, email: event.target.value})} name="email" />
      </div>
      <div className="mb-3">
          <label htmlFor="password">รหัสผ่าน</label>
          <input className="form-control" type="password" placeholder="Enter Password" onChange={event => setValues({...values, password: event.target.value})} name="password" />
      </div>
      <div>
          <button type="submit" className="form-control btn btn-primary" disabled={disableBtn}>เข้าสู่ระบบ</button>
      </div>
    </form>
  )
}

export default LoginPage