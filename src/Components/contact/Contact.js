import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Contact.css";
import Footer from "../footer/Footer";

function Contact() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState({
    email:"",
    message:""
  })
  const handleSubmit = async(e)=>{
    e.preventDefault();
    let req =await axios.post('http://localhost:8000/api/contact',msg);
    console.log(req);
    if(req && req.status==200){
      Swal.fire({
        icon: "success",
        title: req.data,
      }).then(function () {
        navigate("/");
      });
    }
  }
  const handleMsg = (e)=>{
    setMsg({ ...msg, [e.target.id]: e.target.value });
  }

  return (
    <>
    <div className="background">
      <div className="contact_bg">
        <div>
          <p>Contact By Our Email!</p>
          <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31.357"
            height="23.567"
            viewBox="0 0 31.357 23.567"
            className="me-3"
          >
            <path
              d="M17.972,54.683a3.552,3.552,0,0,0,2.3-.848L33.459,42.652l-.686-.809L19.588,53.026a2.491,2.491,0,0,1-3.232,0L3.162,41.855l-.685.809L15.671,53.837A3.552,3.552,0,0,0,17.972,54.683Zm0,0"
              transform="translate(-2.289 -38.674)"
              fill="#e87624"
            ></path>
            <path
              d="M3.56,23.567H27.8a3.564,3.564,0,0,0,3.56-3.56V3.56A3.564,3.564,0,0,0,27.8,0H3.56A3.564,3.564,0,0,0,0,3.56V20.007A3.564,3.564,0,0,0,3.56,23.567ZM1.06,3.56a2.5,2.5,0,0,1,2.5-2.5H27.8a2.5,2.5,0,0,1,2.5,2.5V20.007a2.481,2.481,0,0,1-.3,1.181l-7.224-7.35a.53.53,0,0,0-.756.743L29.308,22a2.485,2.485,0,0,1-1.51.509H3.56a2.485,2.485,0,0,1-1.513-.512L9.3,14.58a.53.53,0,1,0-.758-.741L1.356,21.184a2.487,2.487,0,0,1-.3-1.177Zm0,0"
              fill="#2a3b8e"
            ></path>
          </svg>
          <a href="mailto:info@coding-leader.com" className="contact_link">info@todo-it.com</a>
          </div>
        </div>
        <div>
          <p>Social Media :</p>
          {/* <p>Accounts :</p> */}
          <div>
            <a href="https://facebook.com"><i className="contact_link fab fa-2x fa-facebook-square"></i></a>
            <a href="https://instagram.com"><i className="contact_link fab fa-2x fa-instagram"></i></a>
            <a href="https://twitter.com"><i className="contact_link fab fa-2x fa-twitter-square"></i></a>
            <a href="https://linkedin.com"><i className="contact_link fab fa-2x fa-linkedin"></i></a>
          </div>
        </div>
        <div>
          <p>Contact On Our Phone!</p>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38.489"
              height="32.323"
              viewBox="0 0 38.489 32.323"
              className="me-3"
            >
              <g transform="translate(-50 -83)">
                <path
                  d="M175.5,86.363A3.363,3.363,0,0,0,172.134,83H160.363A3.363,3.363,0,0,0,157,86.363v25.6a3.363,3.363,0,0,0,3.363,3.363h11.771a3.363,3.363,0,0,0,3.363-3.363Zm-15.141-2.242h11.786a2.257,2.257,0,0,1,2.235,2.264v1.006h-1.847a.561.561,0,1,0,0,1.121h1.847v20.459H158.121V88.512h10.036a.561.561,0,1,0,0-1.121H158.121V86.385A2.257,2.257,0,0,1,160.356,84.121ZM172.141,114.2H160.356a2.257,2.257,0,0,1-2.235-2.264v-1.847h16.255v1.847A2.257,2.257,0,0,1,172.141,114.2Z"
                  transform="translate(-97.004)"
                  fill="#2a3b8e"
                ></path>
                <path
                  d="M290.4,131.121h.805a.561.561,0,1,0,0-1.121H290.4a.561.561,0,0,0,0,1.121Z"
                  transform="translate(-217.433 -42.609)"
                  fill="#2a3b8e"
                ></path>
                <path
                  d="M240.012,377.209a1.647,1.647,0,1,0,1.647,1.647A1.647,1.647,0,0,0,240.012,377.209Zm0,2.174a.526.526,0,1,1,.526-.526A.526.526,0,0,1,240.012,379.383Z"
                  transform="translate(-170.768 -266.724)"
                  fill="#2a3b8e"
                ></path>
                <path
                  d="M376.561,185.122a.561.561,0,1,0-.683.889,6.965,6.965,0,0,1-.247,11.229.56.56,0,1,0,.644.918,8.086,8.086,0,0,0,.286-13.035Z"
                  transform="translate(-294.995 -92.476)"
                  fill="#e87624"
                ></path>
                <path
                  d="M405.42,156.5a.561.561,0,0,0-.721.858,10.726,10.726,0,0,1-.223,16.61.561.561,0,1,0,.677.894,11.847,11.847,0,0,0,.267-18.362Z"
                  transform="translate(-321.16 -66.514)"
                  fill="#e87624"
                ></path>
                <path
                  d="M94.363,197.236a6.965,6.965,0,0,1-.247-11.229.561.561,0,0,0-.683-.889,8.086,8.086,0,0,0,.286,13.035.56.56,0,1,0,.644-.918Z"
                  transform="translate(-36.511 -92.473)"
                  fill="#e87624"
                ></path>
                <path
                  d="M55.182,173.976a10.726,10.726,0,0,1-.232-16.617.561.561,0,1,0-.721-.858,11.847,11.847,0,0,0,.267,18.362.561.561,0,1,0,.686-.887Z"
                  transform="translate(0 -66.514)"
                  fill="#e87624"
                ></path>
              </g>
            </svg>
          <a href="tel:0096256235745" className="contact_link">06-6235745</a>
          </div>
        </div>
      </div>
      <div>
          <form onSubmit={handleSubmit} className="contact_form">
              <fieldset>
                  <legend>Contact Us</legend>
                  <h1 className="title contact_title">Contact <span>Us</span>!</h1>
                  <div className="contact_input_container">
                      <div>
                          <label htmlFor="email">Email Address</label>
                          <br/>
                          <input id="email" type='email' onChange={handleMsg} placeholder="email@domain.com" required />
                      </div>
                      <div>
                          <label htmlFor="message">Message</label>
                          <br/>
                          <textarea id="message" onChange={handleMsg} rows={5} cols={20}/>
                      </div>
                      <div className="center">
                          <button type="submit">Send Message</button>
                      </div>
                  </div>
              </fieldset>
          </form>
      </div>
      </div>
      <Footer/>
    </>
  );
}

export default Contact;