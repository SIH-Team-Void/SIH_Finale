import React from "react";
import gpsIcon from "../img/gps.png";
import searchIcon from "../img/search.png";
import dentistIcon from "../img/dentist.png";
import dermatologyIcon from "../img/dermatology.png";
import pediatricsIcon from "../img/paediatricurology.png";
import radiologyIcon from "../img/radiology.png";
import orthopedicIcon from "../img/orthopaedic.png";
import gynecologyIcon from "../img/gynecology.png";
import entIcon from "../img/ent.png";
import cardiologyIcon from "../img/cardiology.png";
import gastroenterologyIcon from "../img/gastroenterology.png";
import psychiatryIcon from "../img/psychiatry.png";
import rajaImg from "../img/raja.png";
import critiImg from "../img/criti.png";
import vedantImg from "../img/vedant.png";
import godrejImg from "../img/godreg.png";
import suranaImg from "../img/surana.png";
import "../css/opd.css"
import { Link } from 'react-router-dom';
import Navbar from '../userComponents/userNavbar';

export default function Opd() {
  return (
    <div className="opd-body">
        <Navbar />
      <div className="opd-upperSection">
        <div className="opd-uppersearch">
          <div className="opd-search-bar">
            <div className="opd-searchone">
              <img src={gpsIcon} alt="gps" />
              <input type="text" placeholder="Search City" />
            </div>
            <div className="opd-searchtwo">
              <img src={searchIcon} alt="search" />
              <input type="text" placeholder="Search By Doctor's Name" />
            </div>
          </div>
        </div>
        <div className="opd-popular-cities">
          <p>
            Popular City People Search For:{" "}
            <a href="#">Mumbai</a> <a href="#">Chennai</a>{" "}
            <a href="#">Kolkata</a> <a href="#">Gorakhpur</a>{" "}
            <a href="#">Bangalore</a> <a href="#">Delhi</a>
          </p>
        </div>
      </div>
      <b className="opd-titles">Select Departments/Specialty</b>
      <div className="opd-departments">
        <div>
          <img src={dentistIcon} alt="Dentist" />
          <p>Dentist</p>
        </div>
        <div>
          <img src={dermatologyIcon} alt="Dermatology" />
          <p>Dermatology</p>
        </div>
        <div>
          <img src={pediatricsIcon} alt="Pediatrics" />
          <p>Pediatrics</p>
        </div>
        <div>
          <img src={radiologyIcon} alt="Radiology" />
          <p>Radiology</p>
        </div>
        <div>
          <img src={orthopedicIcon} alt="Orthopedic" />
          <p>Orthopedic</p>
        </div>
        <div>
          <img src={gynecologyIcon} alt="Gynecology" />
          <p>Gynecology</p>
        </div>
        <div>
          <img src={entIcon} alt="ENT" />
          <p>ENT</p>
        </div>
        <div>
          <img src={cardiologyIcon} alt="Cardiology" />
          <p>Cardiology</p>
        </div>
        <div>
          <img src={gastroenterologyIcon} alt="Gastroenterology" />
          <p>Gastroenterology</p>
        </div>
        <div>
          <img src={psychiatryIcon} alt="Psychiatry" />
          <p>Psychiatry</p>
        </div>
      </div>
      <b className="opd-titles">Select Hospitals</b>
      <div className="opd-lowerSection">
        <div className="opd-search">
          <img src={searchIcon} alt="search" />
          <div className="opd-search-bar">
            <input type="text" placeholder="Search By Hospital's Name" />
          </div>
        </div>
        <div className="opd-hospital-list">
          <div className="opd-hospital-card">
            <img src={rajaImg} alt="Rajawadi Hospital" />
            <div className="opd-hospital-info">
              <h3>Rajawadi Hospital</h3>
              <p>
                3, 7th Rd, Rajawadi Colony, Ghatkopar East, Mumbai, Maharashtra
                400077
              </p>
              <Link to="/user/opdDr">
                <button>See Available Doctor</button>
              </Link>
            </div>
          </div>
          <div className="opd-hospital-card">
            <img src={critiImg} alt="CritiCare Asia Multi Specialty Hospital" />
            <div className="opd-hospital-info">
              <h3>CritiCare Asia Multi Specialty Hospital</h3>
              <p>
                Building No 1, Kirol Road, Kirol Rd, off Lal Bahadur Shastri
                Marg, near Kohinoor International School, Ali Yavar Jung, Kurla
                West, Kurla, Mumbai, Maharashtra 400070
              </p>
              <a href="OPDdr.php">
                <button>See Available Doctor</button>
              </a>
            </div>
          </div>
          <div className="opd-hospital-card">
            <img src={vedantImg} alt="Vedant Central Hospital" />
            <div className="opd-hospital-info">
              <h3>Vedant Central Hospital</h3>
              <p>
                Pasaydan Bhavan, R.B. Kadam Marg, Near Jagruti Nagar Metro
                Station Wagadwala, Jivdaya Ln, next to Jain Temple in, Ghatkopar
                West, Mumbai, Maharashtra 400084
              </p>
              <a href="OPDdr.php">
                <button>See Available Doctor</button>
              </a>
            </div>
          </div>
          <div className="opd-hospital-card">
            <img src={godrejImg} alt="Godrej Memorial Hospital" />
            <div className="opd-hospital-info">
              <h3>Godrej Memorial Hospital</h3>
              <p>
                Opposite Godrej Platinum, Eastern Express Hwy, Vikhroli, Mumbai,
                Maharashtra 400079
              </p>
              <a href="OPDdr.php">
                <button>See Available Doctor</button>
              </a>
            </div>
          </div>
          <div className="opd-hospital-card">
            <img src={suranaImg} alt="Surana Sethia Hospital" />
            <div className="opd-hospital-info">
              <h3>Surana Sethia Hospital</h3>
              <p>
                Sion - Trombay Rd, Suman Nagar, Chembur, Mumbai, Maharashtra
                400071
              </p>
              <a href="OPDdr.php">
                <button>See Available Doctor</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
