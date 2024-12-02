import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/addBed.css';

export default function AddBed() {
  return (
    <div className="addBed-body">
      <Navbar />
      <div className="addBed-form-container">
        <div className="addBed-options">
          <Link to="/admin/addBed">
          <button className="addBed-activity" >
            ADD OR CREATE WARD DETAILS
            </button>
            </Link>
          <Link to="/admin/manageBed"> <button className="addBed-activity"> MANAGE BEDS
            </button></Link>
            <Link to="/admin/bedNo"> <button className="addBed-activity"> MANAGE REQUEST
            </button></Link>
        </div>
        <div className="addBed-forminputs" id="formContent">
          <h3 className="addBed-title">ADD WARD DETAILS</h3>
          <form action="" method="">
            <div className="addBed-form-row">
              <div className="addBed-form-group">
                <label htmlFor="addWard">Ward Name</label>
                <input type="text" id="addWard" name="ward_name" placeholder="Ward Name" required />
              </div>
              <div className="addBed-form-group">
                <label htmlFor="bedNo">Number of Beds</label>
                <input type="number" id="bedNo" name="no_of_beds" placeholder="Number of Beds" required />
              </div>
            </div>
            <div className="addBed-form-row">
              <div className="addBed-form-group">
                <label htmlFor="bedCost">Cost per Bed</label>
                <input type="number" id="bedCost" name="bed_cost" placeholder="Cost per Bed" required />
              </div>
              <div className="addBed-form-group">
                <label htmlFor="bedNo">Ward Image</label>
                <input type="text" id="ward_img" name="ward_img" placeholder="Ward Image" required />
              </div>
            </div>
            <div className="addBed-form-group">
              <label htmlFor="wardDetails">Ward Details</label>
              <div className="addBed-wardDetails">
                <textarea id="wardDetails" name="ward_details" placeholder="Enter Ward Details" rows="3" required></textarea>
              </div>
            </div>
            <button className="addBed-register-btn" type="submit" id="submitButton">Add ward</button>
          </form>
        </div>
      </div>
    </div>
  );
}
