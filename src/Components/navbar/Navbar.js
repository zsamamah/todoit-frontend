import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navBar.css";
import temp from "../../Assets/logo.png";
import Swal from "sweetalert2";
import { HiMenu } from "react-icons/hi";

function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(sessionStorage.getItem("user"));
  const logout = (e) => {
      sessionStorage.clear()
      setUser(null);
    Swal.fire({
      icon: "success",
      title: "Logout Successfully",
    }).then(function() {
      navigate("/");
    });
  };
  useEffect(() => {
    setUser(sessionStorage.getItem("user"));
  });
  const [nav2, setNav2] = useState('flex')
  const showNav = ()=>{
    if(nav2==='none')
      setNav2('flex')
    else
      setNav2('none')
  }

  return (
    <>
      <nav id="nav2">
        <div>
        <Link to="/">
            <img src={temp} alt="logo" />
          </Link>
        </div>
        <div onClick={showNav}>
          <HiMenu />
        </div>
      </nav>
      <nav id="main_nav" style={{display:nav2}}>
        <div>
          <Link to="/" className="nav_logo">
            <img src={temp} alt="logo" />
          </Link>
          <div>
            <Link to="/">Home</Link>
          </div>
          {/* <div>
            <Link to="/board">Board</Link>
          </div> */}
          <div>
            <Link to="/boards">Boards</Link>
          </div>
          <div>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        {user == null ? (
          <div>
            <div>
              <Link to="/login">Login</Link>
            </div>
            <div>
              <Link to="/register">Register</Link>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <Link to='/account'>Account</Link>
            </div>
            <div>
              <button onClick={logout} className="logout_btn">
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;