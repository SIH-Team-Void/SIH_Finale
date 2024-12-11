import React from 'react'
import "../css/goveSc.css";
import Navbar from '../goverComponents/goveNav';

export default function goveSc() {
  return (
    <div className="goveSc-body">
      <Navbar />
      <div className="goveSc-form-container">
        <div className="goveSc-forminputs" id="formContent">
          <h3 className="goveSc-title">Find the patient history</h3>
          <form action="" method="">
            <div className="goveSc-form-row">
              <div className="goveSc-form-group">
                <label htmlFor="bedCost">Enter Aadhaar No:</label>
                <input
                 type="number"
                 id=""
                  name=""
                   placeholder="Enter Aadhaar No" required />
              </div>
            </div>        
            <button className="goveSc-register-btn" type="submit" id="submitButton">Submit</button>
          </form>
          <div className="goveSc-forminputs" id="formContent">
          <h3 className="goveSc-title">Patient general information</h3>
          <p><b>Email:</b></p>
          <p><b>PhoneNo:</b></p>
          <p><b>Gender:</b></p>
          <p><b>PhoneNo:</b></p>
          <p><b>Blood Group:</b></p>
          <p><b>Date of birth:</b></p>
          </div>
          <div className="goveSc-forminputs" id="formContent">
          <h3 className="goveSc-title">Patient history</h3>
          <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Service</th>
                  <th>Description</th>
                  <th>PDF</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}