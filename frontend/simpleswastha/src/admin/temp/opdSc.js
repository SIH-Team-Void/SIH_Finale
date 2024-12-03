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

  // Fetch slots from the API
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/bookings/');
        console.log(response.data);
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

  return (
    <div className="opdSc-body">
      <Navbar />
      <div className="opdSc-opdSc-form-container">
        <div className="opdSc-options">
          <Link to="/admin/drSc" className="opdSc-activity">Manage Existing Schedule</Link>
          <Link to="/admin/opdSc" className="opdSc-activity">Create New Doctor Schedule</Link>
        </div>
        <div className="opdSc-forminputs" id="formContent">
          <form>
            <div className="opdSc-form-row">
              <div className="opdSc-form-group">
                <label htmlFor="date">Select Date</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="opdSc-form-group">
                <label htmlFor="dr">Select Doctor</label>
                <input
                  type="text"
                  id="dr"
                  placeholder="Select Doctor"
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  required
                />
              </div>
              <div className="opdSc-form-group">
                <label htmlFor="Department">Department</label>
                <input
                  type="text"
                  id="Department"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                />
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
                {slots.map((slot) => (
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
            <button type="submit" className="opdSc-submit-btn">Save Schedule</button>
          </form>
        </div>
      </div>
    </div>
  );
}
