import React from 'react';
import "../css/bedBook.css";
import { Link } from 'react-router-dom';
import Navbar from '../userComponents/userNavbar';
import SearchIcon from '../img/search.png';
import RajaImage from '../img/raja.png';
import CritiImage from '../img/criti.png';
import VedantImage from '../img/vedant.png';
import GodrejImage from '../img/godreg.png';
import SuranaImage from '../img/surana.png';

export default function BedBook() {
  return (
    <div className="bedBook-body">
      <Navbar />
      <section>
        <b className="bedBook-titles">Select Hospitals</b>
        <div className="bedBook-lowerSection">
          <div className="bedBook-search">
            <img src={SearchIcon} alt="Search Icon" />
            <div className="bedBook-search-bar">
              <input type="text" placeholder="Search By Hospital's Name" />
            </div>
          </div>
          <div className="bedBook-hospital-list">
            <div className="bedBook-hospital-card">
              <img src={RajaImage} alt="Rajawadi Hospital" />
              <div className="bedBook-hospital-info">
                <h3>Rajawadi Hospital</h3>
                <p>3, 7th Rd, Rajawadi Colony, Ghatkopar East, Mumbai, Maharashtra 400077</p>
                <div className="bedBook-btns">
                <Link to="/user/bedCat">
                    <button className="bedBook-btn">See Available Beds</button>
                </Link>
                  <button className="bedBook-emergency">Emergency Call</button>
                </div>
              </div>
            </div>
            <div className="bedBook-hospital-card">
              <img src={CritiImage} alt="CritiCare Asia Multi Specialty Hospital" />
              <div className="bedBook-hospital-info">
                <h3>CritiCare Asia Multi Specialty Hospital</h3>
                <p>Building No 1, Kirol Road, Kirol Rd, off Lal Bahadur Shastri Marg, near Kohinoor International School, Ali Yavar Jung, Kurla West, Kurla, Mumbai, Maharashtra 400070</p>
                <div className="bedBook-btns">
                  <a href="BedCat.php">
                    <button className="bedBook-btn">See Available Beds</button>
                  </a>
                  <button className="bedBook-emergency">Emergency Call</button>
                </div>
              </div>
            </div>
            <div className="bedBook-hospital-card">
              <img src={VedantImage} alt="Vedant Central Hospital" />
              <div className="bedBook-hospital-info">
                <h3>Vedant Central Hospital</h3>
                <p>Pasaydan Bhavan, R.B. Kadam Marg, Near Jagruti Nagar Metro Station Wagadwala, Jivdaya Ln, next to Jain Temple in, Ghatkopar West, Mumbai, Maharashtra 400084</p>
                <div className="bedBook-btns">
                  <a href="BedCat.php">
                    <button className="bedBook-btn">See Available Beds</button>
                  </a>
                  <button className="bedBook-emergency">Emergency Call</button>
                </div>
              </div>
            </div>
            <div className="bedBook-hospital-card">
              <img src={GodrejImage} alt="Godrej Memorial Hospital" />
              <div className="bedBook-hospital-info">
                <h3>Godrej Memorial Hospital</h3>
                <p>Opposite Godrej Platinum, Eastern Express Hwy, Vikhroli, Mumbai, Maharashtra 400079</p>
                <div className="bedBook-btns">
                  <a href="BedCat.php">
                    <button className="bedBook-btn">See Available Beds</button>
                  </a>
                  <button className="bedBook-emergency">Emergency Call</button>
                </div>
              </div>
            </div>
            <div className="bedBook-hospital-card">
              <img src={SuranaImage} alt="Surana Sethia Hospital" />
              <div className="bedBook-hospital-info">
                <h3>Surana Sethia Hospital</h3>
                <p>Sion - Trombay Rd, Suman Nagar, Chembur, Mumbai, Maharashtra 400071</p>
                <div className="bedBook-btns">
                  <a href="BedCat.php">
                    <button className="bedBook-btn">See Available Beds</button>
                  </a>
                  <button className="bedBook-emergency">Emergency Call</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
