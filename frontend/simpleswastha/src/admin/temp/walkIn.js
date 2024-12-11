import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/opdSc.css';

export default function walkIn() {
  return (
    <div className="opdSc-body">
    <Navbar />
      <div className="opdSc-options">
      <Link to="/admin/opdSc" className="drSc-activity">Manage Existing Schedule</Link>
      <Link to="/admin/drSc" className="drSc-activity">Create New Doctor Schedule</Link>
      <Link to="/admin/walkIn" className="drSc-activity">Manage Walk-in</Link>
      </div>
      <div className="storage-forminputs" id="formContent">
          <form>
            <div className="storage-form-row">
              <div className="storage-form-group">
                <label htmlFor="name">Select Date</label>
                <input type="date" id="name" />
              </div>
              <div className="storage-form-group">
                   <label for="user_group">Select Doctor</label>
                   <select id="user_group" name="user_blood_group" required>
                       <option value="">Select Doctor</option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                   </select>
               </div>
              <div className="storage-form-group">
                   <label for="user_group">Department</label>
                   <select id="user_group" name="user_blood_group" required>
                       <option value="">Select Department</option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                   </select>
               </div>
            </div>
            <div className="storage-form-row">
              <div className="storage-form-group">
                <label htmlFor="name">Add Patient</label>
              </div>
            </div>
            <div className="storage-form-row">
              <div className="storage-form-group">
                <label htmlFor="name">Patient ID</label>
                <input type="number" id="name" placeholder="Patient ID" />
              </div>
              <div className="storage-form-group">
                <label htmlFor="name">Patient Name</label>
                <input type="text" id="name" placeholder="Patient Name" />
              </div>
              <div className="storage-form-group">
                   <label for="user_group">Select Doctor</label>
                   <select id="user_group" name="user_blood_group" required>
                       <option value="">Select Doctor</option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                   </select>
               </div>
            </div>
            <button type="submit" className="storage-save">Add</button> <br /><br />
            <div className="storage-form-row">
              <div className="storage-form-group">
                <label htmlFor="name">Doctor’s Time slots</label>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Date</th>
                  <th>Patient name</th>
                  <th>Doctor Name</th>
                  <th>Token Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="storage-actions">
                      <div className="storage-status-input"> <button className="storage-update-btn">Update</button>
                        <button className="storage-delete-btn" >Delete</button>
                      </div>
                    </td>
                  </tr>
              </tbody>
            </table>
          </form>
        </div>
    </div>
  )
}
