import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import "./Header.css";

function Header() {

  const navigate = useNavigate();
  
  
  

  const logOutHandler = () => {
    console.log(localStorage.getItem("token"));
    axios.put(`http://localhost:8085/UserPage/Logout?token=${localStorage.getItem("token")}`)
    .then((Response) => {
        console.log(Response.data.message);
        localStorage.clear()
        navigate("/Home");
    })
    .catch((Error) => {
        console.log(Error.Response.data);
        console.log(Error);
      });
}

  return (
    
    <>
  
      <nav className="navbar  navbar-expand-lg ">
  <a className="navbar-brand" href="#">BOOK STORE</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
     
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
  
     <button className="btn btn-success btn-sm my-2 my-sm-0 mx-4 " type="submit"  onClick={logOutHandler} >Logout</button>
       
     <Link to="/Login"><button className="btn btn-dark btn-sm mx-4 " type="submit">Login</button></Link>
     

      <Link to="/Order"><button className="btn  btn-primary btn-sm  " type="submit">My Cart</button></Link>
    </form>
  </div>
</nav>

    </>
  )
}

export default Header