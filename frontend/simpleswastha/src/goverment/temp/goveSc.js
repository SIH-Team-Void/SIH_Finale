import React from 'react'
import "../css/goveSc.css";
import Navbar from '../goverComponents/goveNav';
import { Link } from 'react-router-dom';
import SearchIcon from '../img/search.png';
import RajaImage from '../img/raja.png';
import CritiImage from '../img/criti.png';
import VedantImage from '../img/vedant.png';
import GodrejImage from '../img/godreg.png';
import SuranaImage from '../img/surana.png';

export default function goveSc() {
  return (
    <div className="goveSc-body">
    <Navbar />
    <div className="goveSc-form-container">
      <div className="goveSc-forminputs" id="formContent">
        <h3 className="goveSc-title">ADD WARD DETAILS</h3>
        <form action="" method="">
          <div className="goveSc-form-row">
            <div className="goveSc-form-group">
              <label htmlFor="bedCost">Scheme  Name </label>
              <input type="number" id="bedCost" name="bed_cost" placeholder="Scheme  Name " required />
            </div>
            <div className="goveSc-form-group">
              <label htmlFor="bedNo">Upload the scheme document</label>
              <input type="file" id="ward_img" name="ward_img" placeholder="Upload the scheme document" required />
            </div>
          </div>
          <div className="goveSc-form-group">
            <label htmlFor="wardDetails">Scheme description</label>
            <div className="goveSc-wardDetails">
              <textarea id="wardDetails" name="ward_details" placeholder="Enter Scheme description" rows="3" required></textarea>
            </div>
          </div>
          <button className="goveSc-register-btn" type="submit" id="submitButton">To all users</button>
          <button className="goveSc-register-btn" type="submit" id="submitButton">To all hospitals</button>
        </form>
      </div>
    </div>
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
                    <button className="bedBook-btn">Select Hospital</button>
                </Link>
                  
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
                    <button className="bedBook-btn">Select Hospital</button>
                  </a>
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
                    <button className="bedBook-btn">Select Hospital</button>
                  </a>
                  
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
                    <button className="bedBook-btn">Select Hospital</button>
                  </a>
                  
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
                    <button className="bedBook-btn">Select Hospital</button>
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  </div>
  )
}
