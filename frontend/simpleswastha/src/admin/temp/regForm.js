import React from 'react'
import { Link } from 'react-router-dom';
import '../css/regForm.css';

export default function regForm() {
  return (
    <div className="reg-body">
        <div className="reg-main-container">
        <span className="reg-title">Hospital Registration</span>
        <form action="" method="">
            <div className="reg-sub-titles">
                <h3>Basic Details</h3>
            </div>
            <div className="reg-form-row">
                <div className="reg-form-group">
                    <label for="hosp_ID">Hospital ID</label>
                    <input type="number" id="hosp_ID" name="hosp_ID" placeholder="Enter Hospital ID" required />
                </div>
                <div className="reg-form-group">
                    <label for="hosp_name">Hospital Name</label>
                    <input type="text" id="hosp_name" name="hosp_name" placeholder="Enter Hospital Name" required />
                </div>
            </div>
            <div className="reg-form-row">
                <div className="reg-form-group">
                    <label for="hosp_email">Hospital Email Address</label>
                    <input type="email" id="hosp_email" name="hosp_email" placeholder="Hospital Email Address" required />
                </div>
                <div className="reg-form-group">
                    <label for="hosp_contact_no">Hospital Contact Number</label>
                    <input type="text" id="hosp_contact_no" name="hosp_contact_no" placeholder="Hospital Contact Number" required />
                </div>
                <div className="reg-form-group">
                    <label for="image_url">Hospital Image URL</label>
                    <input type="text" id="image_url" name="image_url" placeholder="Enter Image URL" />
                </div>
            </div>
            <div className="reg-sub-titles">
                <h3>Hospital Location</h3>
            </div>
            <div className="reg-form-row">
            <div className="reg-form-group">
                <label for="hosp_lat">Hospital Latitude</label>
                <input type="text" id="hosp_lat" name="hosp_lat" placeholder="Enter Hospital Latitude" required />
            </div>
            <div className="reg-form-group">
                <label for="hosp_log">Hospital Longitude</label>
                <input type="text" id="hosp_log" name="hosp_log" placeholder="Enter Hospital Longitude" required />
            </div>
            </div>
            <div className="reg-form-group">
                <label for="hosp_address">Hospital Address</label>
                <textarea id="hosp_address" name="hosp_address" placeholder="Enter Hospital Address" rows="3"  required ></textarea>
            </div>
            <div className="reg-sub-titles">
                <h3>Hospital Bed Capacity</h3>
            </div>
            <div className="reg-form-group">
                <label for="hosp_no_of_beds">Total Number of Beds</label>
                <input type="number" id="hosp_no_of_beds" name="hosp_no_of_beds" placeholder="Total Number of Beds" required />
            </div>
            <div className="reg-sub-titles">
                <h3>Create Password</h3>
            </div>
            <div className="reg-form-row">
                <div className="reg-form-group">
                    <label for="hosp_password">Password</label>
                    <input type="password" id="hosp_password" name="hosp_password" placeholder="Enter Password" required />
                </div>
                <div className="reg-form-group">
                    <label for="hosp_Cpassword">Confirm Password</label>
                    <input type="password" id="hosp_Cpassword" name="hosp_Cpassword" placeholder="Confirm Password" required />
                </div>
            </div>
            <Link to="/admin/home">
                <button type="submit" className="reg-save" id="submitButton">Submit</button>
            </Link>
            {/* <button type="submit" className="reg-save">Submit</button> */}
        </form>
    </div>
    </div>
  )
}
