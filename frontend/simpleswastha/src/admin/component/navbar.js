import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';
import logo from '../img/nav_logo.png';

export default function NavbarAdmin() {
  return (
    <div className="nav-body">
      <nav className="nav">
        <div className="nav-logo">
          <img src={logo} alt="Simple Svastha" />
        </div>
        <Link to="/admin/home" className="nav-active">Home</Link>
        <Link to="/admin/addBed">Bed Booking</Link>
        <Link to="/admin/drSc">OPD Appointment</Link>
        <Link to="/admin/inventory">Inventory</Link>
        <Link to="/admin/account">Account</Link>
        <button className="nav-helpButton">NOTIFICATION</button>
      </nav>
    </div>
  );
}
