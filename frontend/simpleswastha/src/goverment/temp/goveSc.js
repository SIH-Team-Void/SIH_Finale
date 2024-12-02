import React from 'react'
import "../css/goveSc.css";
import Navbar from '../goverComponents/goveNav';
import { Link } from 'react-router-dom';
import SearchIcon from '../img/search.png';
import RajaImage from '../img/raja.png';

export default function goveSc() {
  return (
    <div className="goveSc-body">
      <Navbar />
      <div className="goveSc-form-container">
        <div className="goveSc-forminputs" id="formContent">
          <h3 className="goveSc-title">ADD NEW SCHEME</h3>
          <form action="" method="">
            <div className="goveSc-form-row">
              <div className="goveSc-form-group">
                <label htmlFor="bedCost">Scheme Name</label>
                <input type="text" id="bedCost" name="bed_cost" placeholder="Scheme Name" required />
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

            {/* New Inputs Section */}
            <div className="goveSc-form-row">
              <div className="goveSc-form-group">
                <label htmlFor="state">Select State</label>
                <select id="state" name="state" required>
                  <option value="">Select State</option>
                  <option value="rajasthan">Rajasthan</option>
                  <option value="west-bengal">West Bengal</option>
                  <option value="arunachal-pradesh">Arunachal Pradesh</option>
                  <option value="andhra-pradesh">Andhra Pradesh</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="chhattisgarh">Chhattisgarh</option>
                </select>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="age">Select Age</label>
                <select id="age" name="age" required>
                  <option value="">Select Age Group</option>
                  <option value="0-13">0-13</option>
                  <option value="13-18">13-18</option>
                  <option value="18-25">18-25</option>
                </select>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="income">Income Group</label>
                <select id="income" name="income" required>
                  <option value="">Select Income Group</option>
                  <option value="0-117000">0 - 1,17,000</option>
                </select>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="goveSc-form-row">
              <div className="goveSc-form-group">
                <label htmlFor="familySize">Family Size</label>
                <select id="familySize" name="familySize" required>
                  <option value="">Select Family Size</option>
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="maritalStatus">Marital Status</label>
                <select id="maritalStatus" name="maritalStatus" required>
                  <option value="">Select Marital Status</option>
                  <option value="married">Married</option>
                  <option value="unmarried">Unmarried</option>
                  <option value="widow">Widow</option>
                </select>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="healthProblems">Health Problems</label>
                <select id="healthProblems" name="healthProblems" required>
                  <option value="">Select Health Problem</option>
                  <option value="general">General</option>
                  <option value="surgery">Surgery</option>
                  <option value="cancer">Cancer</option>
                  <option value="tb">TB</option>
                  <option value="lab-test">Lab Test</option>
                  <option value="heart-diseases">Heart Diseases</option>
                  <option value="transplant">Transplant</option>
                </select>
              </div>
            </div>

            <div className="goveSc-form-group">
              <label htmlFor="case">Case</label>
              <select id="case" name="case" required>
                <option value="">Select Case</option>
                <option value="general">General</option>
                <option value="minor">Minor</option>
              </select>
            </div>

            {/* Submit Buttons */}
            <button className="goveSc-register-btn" type="submit" id="submitButton">To all users</button>
            <button className="goveSc-register-btn" type="submit" id="submitButton">To all hospitals</button>
          </form>
        </div>
      </div>

      {/* Existing Section */}
      <section>
        <b className="goveSc-titles">Select Hospitals</b>
        <div className="goveSc-lowerSection">
          <div className="goveSc-search">
            <img src={SearchIcon} alt="Search Icon" />
            <div className="goveSc-search-bar">
              <input type="text" placeholder="Search By Hospital's Name" />
            </div>
          </div>
          <div className="goveSc-hospital-list">
            {/* Hospital Cards */}
            <div className="goveSc-hospital-card">
              <img src={RajaImage} alt="Rajawadi Hospital" />
              <div className="goveSc-hospital-info">
                <h3>Rajawadi Hospital</h3>
                <p>3, 7th Rd, Rajawadi Colony, Ghatkopar East, Mumbai, Maharashtra 400077</p>
                <div className="goveSc-btns">
                  <Link to="/user/bedCat">
                    <button className="goveSc-btn">Select Hospital</button>
                  </Link>
                </div>
              </div>
            </div>
            {/* Repeat similar blocks for other hospitals */}
          </div>
        </div>
      </section>
    </div>
  )
}
