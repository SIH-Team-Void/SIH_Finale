import React from 'react';
import "../css/userHome.css";
import { Link } from 'react-router-dom';
import Navbar from '../userComponents/userNavbar';
import DoctorsImage from '../img/doctors.png';
import HospitalBedImage from '../img/hospital-bed.png';
import BedNextImage from '../img/bednext.png';
import CalendarImage from '../img/calendar.png';
import OPDNextImage from '../img/opdnext.png';
import MedicineImage from '../img/medicine.png';
import LabNextImage from '../img/labnext.png';

export default function UserHome() {
  return (
    <div className="userHome-body">
        <Navbar />
      <div className="userHome-main-container">
        <img src={DoctorsImage} alt="Doctors" className="userHome-overlay-image" />
        <div className="userHome-text">
          <p>
            We are delighted to welcome you to our Hospital Management
            Information System. Our platform is designed to streamline
            healthcare management, ensuring efficient and effective patient care.
          </p>
        </div>
      </div>

      <div className="userHome-sub-container">
      <Link to="/user/bedBook">
          <div className="userHome-option-box" style={{ backgroundColor: '#c5dcff' }}>
            <div className="userHome-icon-option" style={{ backgroundColor: '#d9ecfe' }}>
              <img src={HospitalBedImage} alt="Hospital Bed" />
            </div>
            <div className="userHome-text-box" style={{ color: '#2f41dd' }}>
              <h3>
                <b>Bed Booking</b>
              </h3>
              <br />
              <p style={{ fontSize: '13px' }}>
                Check the availability for the <br />
                hospital you're looking for.
              </p>
            </div>
            <div className="userHome-arrow-icon">
              <img src={BedNextImage} alt="Next Arrow" />
            </div>
          </div>
        </Link>

        <Link to="/user/opd">
          <div className="userHome-option-box" style={{ backgroundColor: '#b5ebba' }}>
            <div className="userHome-icon-option" style={{ backgroundColor: '#d9fee1' }}>
              <img src={CalendarImage} alt="Calendar" />
            </div>
            <div className="userHome-text-box" style={{ color: '#0d3f1b' }}>
              <h3>
                <b>OPD Appointment</b>
              </h3>
              <br />
              <p style={{ fontSize: '13px' }}>Book your doctor's appointment.</p>
            </div>
            <div className="userHome-arrow-icon">
              <img src={OPDNextImage} alt="Next Arrow" />
            </div>
          </div>
          </Link>

          <Link to="/user/govermentSc">
          <div className="userHome-option-box" style={{ backgroundColor: '#d9a3e7' }}>
            <div className="userHome-icon-option" style={{ backgroundColor: '#fbd9fe' }}>
              <img src={MedicineImage} alt="Medicine" />
            </div>
            <div className="userHome-text-box" style={{ color: '#3e0d3f' }}>
              <h3>
                <b>Goverment Schemes</b>
              </h3>
              <br />
              <p style={{ fontSize: '13px' }}>
                Purchase your medicines <br />
                directly from here.
              </p>
            </div>
            <div className="userHome-arrow-icon">
              <img src={LabNextImage} alt="Next Arrow" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
