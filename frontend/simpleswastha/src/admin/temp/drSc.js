import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../component/navbar';
import '../css/drSc.css';

export default function DrSchedule() {
  const navigate = useNavigate();
  const [hospitalId, setHospitalId] = useState(34); //dummy number
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedHospitalId = localStorage.getItem('hospitalId');
    if (storedHospitalId) {
      setHospitalId(storedHospitalId);
    }
  }, [navigate]);

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const doctorData = {
      doctor_name: e.target.elements.doctorName.value,
      doctor_email: e.target.elements.drEmail.value,
      doctor_phone: e.target.elements.drContact.value,
      education: e.target.elements.education.value,
      department: e.target.elements.department.value,
      hospital_id: hospitalId,
      fees: e.target.elements.drFee.value,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/doctors/', doctorData);
      setModalMessage(`Doctor "${response.data.doctor_name}" has been added successfully!`);
      setShowModal(true);
    } catch (error) {
      console.error('Error adding doctor:', error.response ? error.response.data : error.message);
      alert('Error adding doctor. Please try again later.');
    }
  };

  const handleAddOPD = async (e) => {
    e.preventDefault();
    const formatTime = (timeString) => timeString + ':00'; // Ensure seconds are included

    const slotData = {
      doctor_id: parseInt(e.target.elements.doctorID.value, 10), // Ensure it's a number
      day: e.target.elements.day.value,
      start_time: formatTime(e.target.elements.startTime.value),
      end_time: formatTime(e.target.elements.endTime.value),
      interval: e.target.elements.interval.value, // Consider validation
      fees: parseFloat(e.target.elements.bookingFee.value), // Ensure it's a number
      hospital_id: hospitalId,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/slots/', slotData);
      setModalMessage(
        `OPD Slot for Doctor ID "${slotData.doctor_id}" on "${slotData.day}" has been added successfully!`
      );
      setShowModal(true);
    } catch (error) {
      console.error('Error details:', {
        response: error.response ? error.response.data : 'No response',
        message: error.message,
        config: error.config,
      });
      alert(`Error adding slot: ${error.response ? JSON.stringify(error.response.data) : error.message}`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
  };

  return (
    <div className="drSc-body">
      <Navbar />
      <div className="drSc-main">
        <div className="drSc-options">
          <Link to="/admin/opdSc" className="drSc-activity">Manage Existing Schedule</Link>
          <Link to="/admin/drSc" className="drSc-activity">Create New Doctor Schedule</Link>
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

          <button className="drSc-register-btn" type="submit">ADD SLOT</button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
