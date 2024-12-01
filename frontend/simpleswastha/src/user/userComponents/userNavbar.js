import React from 'react'
import { Link } from 'react-router-dom';
import '../css/userNavbar.css';
import logo from '../img/nav_logo.png';

export default function userNavbar() {
  return (
    <div className="userNav-body">
      <nav className="userNav">
        <div className="userNav-logo">
          <img src={logo} alt="Simple Svastha" />
        </div>
        <Link to="/user/home" className="userNav-active">Home</Link>
        <Link to="/user/bedBook">Bed Booking</Link>
        <Link to="/user/opd">OPD Appointment</Link>
        <Link to="/user/govermentSc">Goverment Schemes</Link>
        <Link to="/user/userAccount">Account</Link>
        <button className="userNav-helpButton">NOTIFICATION</button>
      </nav>
    </div>
  )
}
