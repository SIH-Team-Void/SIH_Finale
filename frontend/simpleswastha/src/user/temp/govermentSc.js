import React from 'react'
import "../css/govermentSc.css";
import Navbar from '../userComponents/userNavbar';
import SearchIcon from '../img/search.png';
import RajaImage from '../img/raja.png';
import { Link } from 'react-router-dom';

export default function govermentSc() {
  return (
    <div className='userGoveSc-body'>
      <Navbar />
      <div className="userGoveSc-form-container">
        <div className="userGoveSc-forminputs" id="formContent">
          <h3 className="userGoveSc-title">View Government Schemes</h3>
          <form action="" method="">
            <div className="userGoveSc-form-row">
              <div className="userGoveSc-form-group">
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
              <div className="userGoveSc-form-group">
                <label htmlFor="age">Select Age</label>
                <select id="age" name="age" required>
                  <option value="">Select Age Group</option>
                  <option value="0-13">0-13</option>
                  <option value="13-18">13-18</option>
                  <option value="18-25">18-25</option>
                </select>
              </div>
              <div className="userGoveSc-form-group">
                <label htmlFor="income">Income Group</label>
                <select id="income" name="income" required>
                  <option value="">Select Income Group</option>
                  <option value="0-117000">0 - 1,17,000</option>
                </select>
              </div>
              <div className="userGoveSc-form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="userGoveSc-form-row">
              <div className="userGoveSc-form-group">
                <label htmlFor="familySize">Family Size</label>
                <select id="familySize" name="familySize" required>
                  <option value="">Select Family Size</option>
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                  ))}
                </select>
              </div>
              <div className="userGoveSc-form-group">
                <label htmlFor="maritalStatus">Marital Status</label>
                <select id="maritalStatus" name="maritalStatus" required>
                  <option value="">Select Marital Status</option>
                  <option value="married">Married</option>
                  <option value="unmarried">Unmarried</option>
                  <option value="widow">Widow</option>
                </select>
              </div>
              <div className="userGoveSc-form-group">
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

            <div className="userGoveSc-form-group">
              <label htmlFor="case">Case</label>
              <select id="case" name="case" required>
                <option value="">Select Case</option>
                <option value="general">General</option>
                <option value="minor">Minor</option>
              </select>
            </div>

            {/* Submit Buttons */}
            <button className="userGoveSc-register-btn" type="submit" id="submitButton">Submit</button>
          </form>
        </div>
      </div>

      {/* Existing Section */}
      <section>
        <b className="userGoveSc-titles">Select Hospitals</b>
        <div className="userGoveSc-lowerSection">
          <div className="userGoveSc-search">
            <img src={SearchIcon} alt="Search Icon" />
            <div className="userGoveSc-search-bar">
              <input type="text" placeholder="Search By Hospital's Name" />
            </div>
          </div>
          <div className="userGoveSc-schemes-list">
            {/* Hospital Cards */}
            <div className="userGoveSc-schemes-card">
              <div className="userGoveSc-schemes-info">
                <h3>Scheme 1</h3>
                <p>Scheme descriptions</p>
                <div className="userGoveSc-btns">
                  <Link to="/user/bedCat">
                    <button className="userGoveSc-btn">Read More</button>
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
