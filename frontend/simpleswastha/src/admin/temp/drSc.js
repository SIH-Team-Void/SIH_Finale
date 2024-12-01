import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/drSc.css';
import axios from 'axios';

export default function drSc() {
  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const doctorData = {
      doctor_name: e.target.doctorName.value,
      doctor_id: e.target.drId.value,
      education: e.target.education.value,
      image_url: e.target.imageUrl.value,
      department: e.target.department.value,
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

    const appointmentData = {
      doctor_id: e.target.doctorID.value,
      doctor_name: e.target.doctor.value,
      date: e.target.date.value,
      start_time: e.target.startTime.value,
      end_time: e.target.endTime.value,
      booking_fee: e.target.bookingFee.value,
      doctor_fee: e.target.drFee.value,
    };

    try {
      await axios.post('/api/appointments/', appointmentData);
      // Handle success (e.g., show a success message)
    } catch (error) {
      console.error('Error adding appointment:', error);
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
              <input type="text" id="doctorName" name="doctorName" placeholder="Doctor Name" />
            </div>
            <div className="drSc-form-group">
              <label htmlFor="drId">Doctor ID</label>
              <input type="text" id="drId" name="drId" placeholder="Doctor ID" />
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

          <div className="drSc-form-group">
            <label htmlFor="department">Department</label>
            <input type="text" id="department" name="department" placeholder="Department" />
          </div>

          <button className="drSc-register-btn" id="submitButton">ADD DOCTOR</button>
        </form>

        <form onSubmit={handleAddOPD}>
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
            <div className="drSc-group">
              <label htmlFor="bookingFee">Booking Fee</label>
              <input type="text" id="bookingFee" name="bookingFee" placeholder="Enter booking fee" />
            </div>
            <div className="drSc-group">
              <label htmlFor="drFee">Doctor Fee</label>
              <input type="text" id="drFee" name="drFee" placeholder="Enter doctor's fee" />
            </div>
          </div>

          <button className="drSc-register-btn" id="submitButton">ADD OPD</button>
        </form>
      </div>
    </div>
  );
}