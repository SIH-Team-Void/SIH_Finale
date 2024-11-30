import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/home.css';
import hospitalBedImage from '../img/hospital-bed.png';
import calendarImage from '../img/calendar.png';
import medicineImage from '../img/medicine.png';
import bedNextImage from '../img/bednext.png';
import opdNextImage from '../img/opdnext.png';
import labNextImage from '../img/labnext.png';
import doctorsImage from '../img/doctors.png';
import backgroundImage from '../img/background_img.png';

export default function Home() {
  return (
    <div className="home-body">
      <Navbar />
      <div className="home-main-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <img src={doctorsImage} alt="Doctors Image" className="home-overlay-image" />
        <div className="home-text">
          <p>We are delighted to welcome you to our Hospital Management Information System. Our platform is designed to streamline healthcare management, ensuring efficient and effective patient care.</p>
        </div>
      </div>

      <div className="home-sub-container">
        <Link to="/admin/addBed">
        <div className="home-option-box" style={{ backgroundColor: '#c5dcff' }}>
            <div className="home-icon-option" style={{ backgroundColor: '#d9ecfe' }}>
              <img src={hospitalBedImage} alt="Hospital Bed" />
            </div>
            <div className="home-text-box" style={{ color: '#2f41dd' }}>
              <h3><b>Bed Booking</b></h3>
              <br />
              <p style={{ fontSize: '13px' }}>Check the availability for the <br />hospital you're looking for.</p>
            </div>
            <div className="home-arrow-icon">
              <img src={bedNextImage} alt="Next" />
            </div>
        </div>
        </Link>

        <Link to="/admin/addBed">
          <div className="home-option-box" style={{ backgroundColor: '#b5ebba' }}>
            <div className="home-icon-option" style={{ backgroundColor: '#d9fee1' }}>
              <img src={calendarImage} alt="Calendar" />
            </div>
            <div className="home-text-box" style={{ color: '#0d3f1b' }}>
              <h3><b>OPD Appointment</b></h3>
              <br />
              <p style={{ fontSize: '13px' }}>Book your doctor's appointment.</p>
            </div>
            <div className="home-arrow-icon">
              <img src={opdNextImage} alt="Next" />
            </div>
          </div>
        </Link>

        <Link to="/admin/inventory">
          <div className="home-option-box" style={{ backgroundColor: '#d9a3e7' }}>
            <div className="home-icon-option" style={{ backgroundColor: '#fbd9fe' }}>
              <img src={medicineImage} alt="Medicine" />
            </div>
            <div className="home-text-box" style={{ color: '#3e0d3f' }}>
              <h3><b>Inventory</b></h3>
              <br />
              <p style={{ fontSize: '13px' }}>Purchase your medicines <br />directly from here.</p>
            </div>
            <div className="home-arrow-icon">
              <img src={labNextImage} alt="Next" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
