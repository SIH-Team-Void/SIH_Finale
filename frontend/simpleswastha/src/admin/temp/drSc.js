import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../component/navbar';
import '../css/drSc.css';

export default function DrSchedule() {
  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const doctorData = {
      doctor_name: e.target.elements.doctorName.value,
      doctor_email: e.target.elements.drEmail.value,
      doctor_phone: e.target.elements.drContact.value,
      education: e.target.elements.education.value,
      department: e.target.elements.department.value,
      hospital_id: e.target.elements.hospitalId.value,
      fees: e.target.elements.drFee.value
    };

    try {
      // Ensure the full URL is correctly specified
      const response = await axios.post('http://localhost:8000/api/doctors/', doctorData);
      
      // Handle success (e.g., show a success message)
      console.log('Doctor added:', response.data);
    } catch (error) {
      console.error('Error adding doctor:', error.response ? error.response.data : error.message);
      // Handle error (e.g., show an error message)
    }    
  };

  const handleAddOPD = async (e) => {
    e.preventDefault();

    const slotData = {
      doctor_id: e.target.elements.doctorID.value,
      day: e.target.elements.day.value,
      start_time: e.target.elements.startTime.value,
      end_time: e.target.elements.endTime.value,
      interval: e.target.elements.interval.value, // Adding interval 
      fees: e.target.elements.bookingFee.value,
      hospital_id: e.target.elements.hospitalId.value
    };

    try {
      await axios.post('http://localhost:8000/api/slots/', slotData);
      // Handle success (e.g., show a success message)
      console.log('Slot added successfully');
    } catch (error) {
      console.error('Error adding slot:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="drSc-body">
      <Navbar />
      <div className="drSc-main">
        <div className="drSc-options">
          <Link to="/admin/DrSc" className="drSc-activity">Manage Existing Schedule</Link>
          <Link to="/admin/opdSc" className="drSc-activity">Create New Doctor Schedule</Link>
        </div>

        <form onSubmit={handleAddDoctor}>
          <h3>Add Doctor</h3>
          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="doctorName">Doctor Name</label>
              <input type="text" id="doctorName" name="doctorName" placeholder="Doctor Name" required />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="department">Department</label>
              <input type="text" id="department" name="department" placeholder="Department" required />
            </div>
          </div>

          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="education">Education</label>
              <input type="text" id="education" name="education" placeholder="Doctor's Education" required />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="hospitalId">Hospital ID</label>
              <input type="number" id="hospitalId" name="hospitalId" placeholder="Hospital ID" required />
            </div>
          </div>

          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="drContact">Dr Contact No</label>
              <input type="tel" id="drContact" name="drContact" placeholder="Doctor's Contact No" required />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="drEmail">Dr Email</label>
              <input type="email" id="drEmail" name="drEmail" placeholder="Doctor's Email" required />
            </div>
          </div>

          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="drFee">Doctor Fee</label>
              <input type="number" id="drFee" name="drFee" placeholder="Enter doctor's fee" required />
            </div>
          </div>

          <button className="drSc-register-btn" type="submit">ADD DOCTOR</button>
        </form>

        <form onSubmit={handleAddOPD}>
          <h3>OPD Slot</h3>
          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="doctorID">Doctor ID</label>
              <input type="number" id="doctorID" name="doctorID" placeholder="Doctor ID" required />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="day">Day</label>
              <input type="text" id="day" name="day" placeholder="Day of Week" required />
            </div>
          </div>

          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="startTime">Start Time</label>
              <input type="time" id="startTime" name="startTime" required />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="endTime">End Time</label>
              <input type="time" id="endTime" name="endTime" required />
            </div>
          </div>

          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="interval">Slot Interval</label>
              <input type="text" id="interval" name="interval" placeholder="Slot Interval (e.g., 00:30:00)" required />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="bookingFee">Booking Fee</label>
              <input type="number" id="bookingFee" name="bookingFee" placeholder="Booking Fee" required />
            </div>
          </div>

          <div className="drSc-form-row">
            <div className="drSc-form-group">
              <label htmlFor="hospitalId">Hospital ID</label>
              <input type="number" id="hospitalId" name="hospitalId" placeholder="Hospital ID" required />
            </div>
          </div>

          <button className="drSc-register-btn" type="submit">ADD SLOT</button>
        </form>
      </div>
    </div>
  );
}