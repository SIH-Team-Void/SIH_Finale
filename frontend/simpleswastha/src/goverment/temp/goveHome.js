import React from 'react';
import "../css/goveHome.css";
import { Link } from 'react-router-dom';
import Navbar from '../goverComponents/goveNav';
import DoctorsImage from '../img/doctors.png';
import locImage from '../img/loc.png';
import BedNextImage from '../img/bednext.png';
import govScImage from '../img/govSc.png';
import OPDNextImage from '../img/opdnext.png';
import LabNextImage from '../img/labnext.png';

export default function goveHome() {
  return (
    <div className="goveHome-body">
        <Navbar />
      <div className="goveHome-main-container">
        <img src={DoctorsImage} alt="Doctors" className="goveHome-overlay-image" />
        <div className="goveHome-text">
          <h3>GOVERNMENT PORTAL</h3>
          <p>
          MANAGING DISASTER CASULATIES AND RELEASE OF NEW GOVERNMENT SCHEMES.
          </p>
        </div>
      </div>

      <div className="goveHome-sub-container">
      <Link to="/government/map">
          <div className="goveHome-option-box" style={{ backgroundColor: '#c5dcff' }}>
            <div className="goveHome-icon-option" style={{ backgroundColor: '#d9ecfe' }}>
              <img src={locImage} alt="Hospital Bed" />
            </div>
            <div className="goveHome-text-box" style={{ color: '#2f41dd' }}>
              <h3>
                <b>DCMS</b>
              </h3>
              <br />
              <p style={{ fontSize: '13px' }}>
              Disaster casualty management systems.<br />
              </p>
            </div>
            <div className="goveHome-arrow-icon">
              <img src={BedNextImage} alt="Next Arrow" />
            </div>
          </div>
        </Link>

        <Link to="/government/schemes">
          <div className="goveHome-option-box" style={{ backgroundColor: '#b5ebba' }}>
            <div className="goveHome-icon-option" style={{ backgroundColor: '#d9fee1' }}>
              <img src={govScImage} alt="Calendar" />
            </div>
            <div className="goveHome-text-box" style={{ color: '#0d3f1b' }}>
              <h3>
                <b>GOVERNMENT SCHEMES</b>
              </h3>
              <br />
              <p style={{ fontSize: '13px' }}>Release new upcoming schemes.</p>
            </div>
            <div className="goveHome-arrow-icon">
              <img src={OPDNextImage} alt="Next Arrow" />
            </div>
          </div>
          </Link>

          <Link to="/government/centralPa">
          <div className="goveHome-option-box" style={{ backgroundColor: '#b5ebba' }}>
            <div className="goveHome-icon-option" style={{ backgroundColor: '#d9fee1' }}>
              <img src={govScImage} alt="Calendar" />
            </div>
            <div className="goveHome-text-box" style={{ color: '#0d3f1b' }}>
              <h3>
                <b>Centralized Patient History</b>
              </h3>
              <br />
              <p style={{ fontSize: '13px' }}>Find the history of the user.</p>
            </div>
            <div className="goveHome-arrow-icon">
              <img src={OPDNextImage} alt="Next Arrow" />
            </div>
          </div>
          </Link>
      </div>
    </div>
  );
}
