import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../component/navbar';
import '../css/drSc.css';

export default function DrSchedule() {
  const navigate = useNavigate();
  const [hospitalId, setHospitalId] = useState(34); // Initially null
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [doctorFees, setDoctorFees] = useState(null); // To store the retrieved doctor's fee

  // Fetch the hospital ID on component mount
  useEffect(() => {
    const storedHospitalId = localStorage.getItem('hospitalId');
    if (storedHospitalId) {
      setHospitalId(storedHospitalId);
    }
  }, []);

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const doctorData = {
      doctor_name: e.target.elements.doctorName.value,
      doctor_email: e.target.elements.drEmail.value,
      doctor_phone: e.target.elements.drContact.value,
      education: e.target.elements.education.value,
      department: e.target.elements.department.value,
      hospital_id: hospitalId, // Use the fetched hospital ID
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

    const doctorId = parseInt(e.target.elements.doctorID.value, 10); // Ensure it's a number
    const slotData = {
      doctor_id: doctorId,
      day: e.target.elements.day.value,
      start_time: formatTime(e.target.elements.startTime.value),
      end_time: formatTime(e.target.elements.endTime.value),
      interval: e.target.elements.interval.value, // Consider validation
      hospital_id: hospitalId, // Use the fetched hospital ID
      online_hours: e.target.elements.onlineDuration.value, 
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

  // const handleDoctorIdChange = (e) => {
  //   const doctorId = e.target.value;
  //   if (doctorId) {
  //     fetchDoctorFees(doctorId);
  //   }
  // };

  return (
    <div className="drSc-body">
      <Navbar />
      <div className="drSc-main">
        <div className="drSc-options">
          <Link to="/admin/opdSc" className="drSc-activity">Manage Existing Schedule</Link>
          <Link to="/admin/drSc" className="drSc-activity">Create New Doctor Schedule</Link>
          <Link to="/admin/walkIn" className="drSc-activity">Manage Walk-in</Link>
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
              <input
                type="number"
                id="doctorID"
                name="doctorID"
                placeholder="Doctor ID"
                required
                // onChange={handleDoctorIdChange}
              />
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
              <label htmlFor="onlineDuration">Online Duration</label>
              <input type="text" id="onlineDuration" name="onlineDuration" placeholder="Online Duration (e.g., 02:00:00)" required />
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
