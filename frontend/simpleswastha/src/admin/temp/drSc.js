import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/drSc.css';

export default function drSc() {
  return (
    <div className="drSc-body">
      <Navbar />
      <div className="drSc-main">
        <div className="drSc-options">
          <Link to="/admin/DrSc" className="drSc-activity">Manage Existing Schedule</Link>
          <Link to="/admin/opdSc" className="drSc-activity">Create New Doctor Schedule</Link>
        </div>

        <form action="../../Back-end/DrSc_AddDr.php" method="POST">
          <h3>Add Doctor</h3>
          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="doctorName">Doctor Name</label>
              <input type="text" id="doctorName" name="doctorName" placeholder="Doctor Name" />
            </div>
            <div className="drSc-form-group">
            <label htmlFor="department">Department</label>
            <input type="text" id="department" name="department" placeholder="Department" />
          </div>
          </div>

          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="education">Education</label>
              <input type="text" id="education" name="education" placeholder="Doctor's Education" />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="imageUrl">Image URL</label>
              <input type="text" id="imageUrl" name="imageUrl" placeholder="Image URL" />
            </div>
          </div>

          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="education">Dr Contact No: </label>
              <input type="number" id="education" name="education" placeholder="Doctor's Contact No" />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="imageUrl"> Dr Email</label>
              <input type="email" id="imageUrl" name="imageUrl" placeholder="Doctor's Email" />
            </div>
          </div>
          <div className="drSc-form-row">
          <div className="drSc-group">
              <label htmlFor="drFee">Doctor Fee</label>
              <input type="text" id="drFee" name="drFee" placeholder="Enter doctor's fee" />
            </div>
            </div>
          <button className="drSc-register-btn" id="submitButton">ADD DOCTOR</button>
        </form>

        <form action="../../Back-end/DrSc_AddOPD.php" method="POST">
          <h3>OPD Appointment</h3>
          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="doctorID">Doctor ID</label>
              <input type="text" id="doctorID" name="doctorID" placeholder="Doctor ID" required />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="doctor">Doctor Name</label>
              <input type="text" id="doctor" name="doctor" placeholder="Doctor Name" required />
            </div>
          </div>

          <div className="drSc-form-row">
            <div className="drSc-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" name="date" required />
            </div>
            <div className="drSc-group">
              <label htmlFor="startTime">Start Time</label>
              <input type="time" id="startTime" name="startTime" required />
            </div>
            <div className="drSc-group">
              <label htmlFor="endTime">End Time</label>
              <input type="time" id="endTime" name="endTime" required />
            </div>
          </div>

          <button className="drSc-register-btn" id="submitButton">ADD OPD</button>
        </form>
      </div>
    </div>
  );
}
