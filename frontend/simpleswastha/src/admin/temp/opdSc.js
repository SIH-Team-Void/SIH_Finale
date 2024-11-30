import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/opdSc.css';

export default function opdSc() {
  return (
    <div className="opdSc-body">
      <Navbar />
      <div className="opdSc-opdSc-form-container">
        <div className="opdSc-options">
          <Link to="/admin/drSc" className="opdSc-activity">Manage Existing Schedule</Link>
          <Link to="/admin/opdSc" className="opdSc-activity">Create New Doctor Schedule</Link>
        </div>
        <div className="opdSc-forminputs" id="formContent">
          <div className="opdSc-form-row">
            <div className="opdSc-form-group">
              <label htmlFor="date">Select Date</label>
              <input type="date" id="date" placeholder="--:-- --" />
            </div>
            <div className="opdSc-form-group">
              <label htmlFor="dr">Select Doctor</label>
              <input type="text" id="dr" placeholder="Select Doctor" required />
            </div>
            <div className="opdSc-form-group">
              <label htmlFor="Department">Department</label>
              <input type="text" id="Department" placeholder="Department" />
            </div>
          </div>

          <div className="opdSc-form-group">
            <label htmlFor="doctor-time">Doctor’s Time slots</label>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
                <th>Patient Name</th>
                <th>Token Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>14:23:00</td>
                <td>14:43:00</td>
                <td className="opdSc-vacant">VACANT</td>
                <td>XYZ</td>
                <td>123</td>
                <td className="opdSc-actions">
                  <div className="opdSc-status-input">
                    <input type="text" value="VACANT" readOnly />
                    <input type="text" value="XYZ" readOnly />
                    <input type="text" value="123" readOnly />
                    <button className="opdSc-update-btn">Update</button>
                    <button className="opdSc-delete-btn">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
