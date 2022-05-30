import axios from "axios";
import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./login.css";

function Login() {
  const navigate = useNavigate()
  useEffect(() => {
    if(sessionStorage.getItem('user'))
      navigate('/')
  })
  const [loginEmail,SetLoginEmail] = useState(null)
  const [loginPassword,SetLoginPassword] = useState(null)

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/api/login',{
      email:loginEmail,
      password:loginPassword,
    },{
      headers:{'Content-Type':'application/json'}
    }).catch((err) => console.log(err));
    console.log(res)
    // console.log(res.status);
    // console.log(res.data);

    switch(res.status){
      case 200:
        sessionStorage.setItem('user',JSON.stringify(res.data.user));
        sessionStorage.setItem('todo',JSON.stringify(res.data.todo));
        sessionStorage.setItem('doing',JSON.stringify(res.data.doing));
        sessionStorage.setItem('done',JSON.stringify(res.data.done));
        Swal.fire({
          icon: 'success',
          title: 'Successfully Login!'
        }).then(function(){
          navigate('/')
        })
        break;
      case 201:
        Swal.fire({
          icon: 'error',
          title: res.data.message,
          footer:"<a href='/register'>Don`t Have Account? Register Now !</a>"
        })
        break;
      case 202:
        Swal.fire({
          icon: 'warning',
          title: res.data.message,
        })
        break;
      default:
        alert("Fix switch in login!")
    }
  }
  const handleChange=(e)=>{
    switch (e.target.id) {
      case "email":
        SetLoginEmail(e.target.value)
        break;
      case "password":
        SetLoginPassword(e.target.value)
        break;
      default:
        alert("Impossible Error!!!");
    }
  }
  return (
    <>
    <div className="login_form_container">
      <form onSubmit={handleSubmit} id="login_form">
        <div>
          <p className="login_header">Login To Your Board Now !</p>
          <p className="login_fontawesome"><i className="far fa-lock-alt fa-3x"></i></p>
        </div>
        <div className="login_inputs_container">
        <div>
          <label htmlFor="email">Email Address : </label>
          <br/>
          <input type="email" id="email" placeholder="username@domain.com" onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <br/>
          <input type="password" id="password" onChange={handleChange} required />
        </div>
        <div className="center">
          <button type="submit">Login</button>
        </div>
        </div>
        <div className="login_register_toggle">
          <p>Don`t Have an Account? <Link to='/register'>Signup now!</Link></p>
        </div>
      </form>
    </div>
    </>
  )
}

export default Login