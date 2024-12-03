import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import axios from 'axios';
import '../css/opdSc.css';


export default function OpdSc() {
  const [date, setDate] = useState('');
  const [doctor, setDoctor] = useState('');
  const [department, setDepartment] = useState('');
  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);


  // Fetch slots from the API
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/bookings/');
        setSlots(response.data);  // 'doctor_name' will be included in the response
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };


    fetchSlots();
  }, []);


  // Update booking status and details
  const updateSlot = async (slotId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/bookings/${slotId}/`, {
        ...updatedData,
        is_booked: true,  // Mark the slot as booked
      });
      const updatedSlots = slots.map((slot) =>
        slot.booking_id === slotId ? response.data : slot
      );
      setSlots(updatedSlots);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };


  // Delete booking
  const deleteSlot = async (slotId) => {
    try {
      await axios.delete(`http://localhost:8000/api/bookings/${slotId}/`);
      const updatedSlots = slots.filter((slot) => slot.booking_id !== slotId);
      setSlots(updatedSlots);
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };


  // Handle filter changes for date, doctor, and department
  const handleFilterChange = () => {
    const filtered = slots.filter((slot) => {
      return (
        (date ? slot.date === date : true) &&
        (doctor ? slot.doctor_name.toLowerCase().includes(doctor.toLowerCase()) : true) &&
        (department ? slot.department.toLowerCase().includes(department.toLowerCase()) : true)
      );
    });
    setFilteredSlots(filtered);
  };


  // Run filtering whenever slots, date, doctor, or department change
  useEffect(() => {
    handleFilterChange();
  }, [date, doctor, department, slots]);


  return (
    <div className="opdSc-body">
      <Navbar />
      <div className="opdSc-opdSc-form-container">
        <div className="opdSc-options">
          <Link to="/admin/opdSc" className="drSc-activity">Manage Existing Schedule</Link>
          <Link to="/admin/drSc" className="drSc-activity">Create New Doctor Schedule</Link>
        </div>
        <div className="opdSc-forminputs" id="formContent">
          <form>
            <div className="opdSc-form-row">
              <div className="opdSc-form-group">
                <label htmlFor="date">Select Date</label>
                <select
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                >
                  <option value="">All Dates</option>
                  {[...new Set(slots.map((slot) => slot.date))].map((dateOption) => (
                    <option key={dateOption} value={dateOption}>
                      {dateOption}
                    </option>
                  ))}
                </select>
                {date && <p>Selected Date: {date}</p>}
              </div>


              <div className="opdSc-form-group">


                <label htmlFor="dr">Select Doctor</label>
                <select
                  id="dr"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                >
                  <option value="">All Doctors</option>
                  {[...new Set(slots.map((slot) => slot.doctor_name))].map((doctorOption) => (
                    <option key={doctorOption} value={doctorOption}>
                      {doctorOption}
                    </option>
                  ))}
                </select>
                {doctor && <p>Selected Doctor: {doctor}</p>}
              </div>


              <div className="opdSc-form-group">
                <label htmlFor="Department">Department</label>
                <select
                  id="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {[...new Set(slots.map((slot) => slot.department))].map((departmentOption) => (
                    <option key={departmentOption} value={departmentOption}>
                      {departmentOption}
                    </option>
                  ))}
                </select>
                {department && <p>Selected Department: {department}</p>}
              </div>
            </div>


            <div className="opdSc-form-group">
              <label htmlFor="doctor-time">Doctor’s Time slots</label>
            </div>


            <table>
              <thead>
                <tr>
                  <th>Doctor Name</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Status</th>
                  <th>Patient Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSlots.map((slot) => (
                  <tr key={slot.booking_id}>
                    <td>{slot.doctor_name}</td>
                    <td>{slot.date}</td>
                    <td>{slot.start_time}</td>
                    <td>{slot.end_time}</td>
                    <td>{slot.is_booked ? 'Booked' : 'Vacant'}</td>
                    <td>{slot.patient_name || 'N/A'}</td>
                    <td className="opdSc-actions">
                      <div className="opdSc-status-input">
                        <input type="text" value={slot.is_booked ? 'Booked' : 'Vacant'} readOnly />
                        <input type="text" value={slot.patient_name || 'N/A'} readOnly />
                        <button
                          className="opdSc-update-btn"
                          onClick={() => updateSlot(slot.booking_id, { patient_name: 'John Doe' })}
                        >
                          Update
                        </button>
                        <button
                          className="opdSc-delete-btn"
                          onClick={() => deleteSlot(slot.booking_id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}





