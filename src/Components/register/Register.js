import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import Swal from "sweetalert2";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem('user'))
      navigate('/')
  }, [])

  const [rFname, setFname] = useState("");
  const [rEmail, setEmail] = useState("");
  const [rPassword, setPassword] = useState("");
  const [rePassword, setrePassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
      let user = {
        name: rFname,
        email: rEmail,
        password: rPassword,
        repassword: rePassword,
      };
      const res = await axios
        .post(
          "http://localhost:8000/api/register",
          {
            name: rFname,
            email: rEmail,
            password: rPassword,
            repassword: rePassword,
          }
        )
        .catch((err) => console.log(err));
      console.log(res);
      if(res && res.status==200){
          Swal.fire({
            icon: "success",
            title: "Successfully Registration",
          }).then(function () {
            navigate("/login");
          });
      }else{
        Swal.fire({
          icon: "warning",
          title: "Email Found",
        }).then(function () {
          navigate("/login");
        });
      }
  };

  const handleChange=(e)=>{
    switch (e.target.id) {
      case "name":
        setFname(e.target.value)
        break;
      case "email":
        setEmail(e.target.value)
        break;
      case "password":
        setPassword(e.target.value)
        break;
      case "repassword":
        setrePassword(e.target.value)
        break;
      default:
        break;
    }
  }

  return (
    <>
      <div className="login_form_container">
        <form id="register_form" onSubmit={handleSubmit}>
          <div>
            <p className="login_header">Register To Coding Leader Now !</p>
            <p className="login_fontawesome">
              <i className="fal fa-user-circle fa-3x"></i>
            </p>
          </div>
          <div className="login_inputs_container">
            <div>
              <label htmlFor="name">Full Name : </label>
              <br />
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                onChange={handleChange}
                required
              />
              <p className="error" id="RU-fname"></p>
            </div>
            <div>
              <label htmlFor="email">Email Address :</label>
              <br />
              <input
                type="email"
                id="email"
                placeholder="username@domain.com"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password : </label>
              <br />
              <input
                type="password"
                id="password"
                onChange={handleChange}
                required
              />
              <p className="error" id="RU-password"></p>
            </div>
            <div>
              <label htmlFor="repassword">Repeat Password : </label>
              <br />
              <input
                type="password"
                id="repassword"
                onChange={handleChange}
                required
              />
              <p className="error" id="RU-repassword"></p>
            </div>
            <div>
              <button id="submit_RegisterForm" type="submit">
                Register
              </button>
            </div>
          </div>
          <div className="login_register_toggle">
            <p>
              Already Have an Account? <Link to="/login">Login now!</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;