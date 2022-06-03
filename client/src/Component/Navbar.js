import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar(){
    return(
        <>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">MERN DEVLOPMENT</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/Register">Register</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link active" to="/login" id="navbarDropdown" role="button"  aria-expanded="false">
           Login
          </Link>
          
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/about"  aria-disabled="true">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/contact"  aria-disabled="true">Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/logout"  aria-disabled="true">LogOut</Link>
        </li>
      </ul>
    
    </div>
  </div>
</nav>

        
        </>
    )
}