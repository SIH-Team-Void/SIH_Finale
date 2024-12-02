/*import React from 'react'
import "../css/goveSc.css";
import Navbar from '../goverComponents/goveNav';
import { Link } from 'react-router-dom';
import SearchIcon from '../img/search.png';
import RajaImage from '../img/raja.png';

export default function goveSc() {
  return (
    <div className="goveSc-body">
      <Navbar />
      <div className="goveSc-form-container">
        <div className="goveSc-forminputs" id="formContent">
          <h3 className="goveSc-title">ADD NEW SCHEME</h3>
          <form action="" method="">
            <div className="goveSc-form-row">
              <div className="goveSc-form-group">
                <label htmlFor="bedCost">Scheme Name</label>
                <input
                 type="text"
                 id="bedCost"
                  name="bed_cost"
                   placeholder="Scheme Name" required />
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="bedCost">Scheme URL</label>
                <input
                 type="url"
                 id="bedCost"
                  name="bed_cost"
                   placeholder="Scheme Info Link" required />
              </div>
            </div>
            <div className="goveSc-form-group">
              <label htmlFor="wardDetails">Scheme description</label>
              <div className="goveSc-wardDetails">
                <textarea id="wardDetails" name="ward_details" placeholder="Enter Scheme description" rows="3" required></textarea>
              </div>
            </div>

            {
            <div className="goveSc-form-row">
              <div className="goveSc-form-group">
                <label htmlFor="state">Select State</label>
                
                <input id="state" name="state" required>
                  
                </input>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="age">Select Age</label>
                <input id="age" name="age" required>
                  
                </input>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="income">Income Group</label>
                <input id="income" name="income" required>
                  
                </input>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="gender">Gender</label>
                <input id="gender" name="gender" required>
                  
                </input>
              </div>
            </div>

            <div className="goveSc-form-row">
              <div className="goveSc-form-group">
                <label htmlFor="familySize">Family Size</label>
                <input id="familySize" name="familySize" required>
                  
                </input>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="maritalStatus">Marital Status</label>
                <input id="maritalStatus" name="maritalStatus" required>
                  
                </input>
              </div>
              <div className="goveSc-form-group">
                <label htmlFor="healthProblems">Health Problems</label>
                <input id="healthProblems" name="healthProblems" required>
                  
                </input>
              </div>
            </div>

            <div className="goveSc-form-group">
              <label htmlFor="case">Cast</label>
              <input id="case" name="case" required>
                
              </input>
            </div>

            
            
            <button className="goveSc-register-btn" type="submit" id="submitButton">Submit</button>
          </form>
        </div>
      </div>

      
      <section>
        <b className="goveSc-titles">Select Hospitals</b>
        <div className="goveSc-lowerSection">
          <div className="goveSc-search">
            <img src={SearchIcon} alt="Search Icon" />
            <div className="goveSc-search-bar">
              <input type="text" placeholder="Search By Hospital's Name" />
            </div>
          </div>
          <div className="goveSc-hospital-list">
            
            <div className="goveSc-hospital-card">
              <img src={RajaImage} alt="Rajawadi Hospital" />
              <div className="goveSc-hospital-info">
                <h3>Rajawadi Hospital</h3>
                <p>3, 7th Rd, Rajawadi Colony, Ghatkopar East, Mumbai, Maharashtra 400077</p>
                <div className="goveSc-btns">
                  <Link to="/user/bedCat">
                    <button className="goveSc-btn">Select Hospital</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/goveSc.css";
import Navbar from "../goverComponents/goveNav";
import axios from "axios";

const GoveScForm = () => {
    const [formData, setFormData] = useState({
        schemeName: "",
        schemeUrl: "",
        schemeDescription: "",
        userState: "",
        userAge: "",
        income: "",
        gender: "",
        familySize: "",
        maritalStatus: "",
        healthProblems: "",
        caste: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        try {
            const response = await axios.post("http://localhost:8000/api/schemes/", formData);
            console.log('Scheme Added:', response.data);
            if (response.status === 201) {
                // Successfully added
                navigate("/display");
            } else {
                alert("Error submitting the form");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an issue submitting the form. Please try again.");
        }
    };

    return (
        <div className="goveSc-body">
            <Navbar />
            <div className="goveSc-form-container">
                <h3 className="goveSc-title">ADD NEW SCHEME</h3>
                <form onSubmit={handleSubmit}>
                    <div className="goveSc-form-row">
                        <div className="goveSc-form-group">
                            <label>Scheme Name</label>
                            <input
                                type="text"
                                name="schemeName"
                                placeholder="Scheme Name"
                                value={formData.schemeName}
                                onChange={handleChange}
                                
                            />
                        </div>
                        <div className="goveSc-form-group">
                            <label>Scheme URL</label>
                            <input
                                type="url"
                                name="schemeUrl"
                                placeholder="Scheme Info Link"
                                value={formData.schemeUrl}
                                onChange={handleChange}
                                
                            />
                        </div>
                    </div>

                    <div className="goveSc-form-group">
                        <label>Scheme Description</label>
                        <textarea
                            name="schemeDescription"
                            placeholder="Enter Scheme description"
                            value={formData.schemeDescription}
                            onChange={handleChange}
                            rows="3"
                            
                        />
                    </div>

                    <div className="goveSc-form-row">
                        {[
                            { label: "Select State", name: "userState" },
                            { label: "Select Age", name: "userAge" },
                            { label: "Income Group", name: "income" },
                            { label: "Gender", name: "gender" },
                            { label: "Family Size", name: "familySize" },
                            { label: "Marital Status", name: "maritalStatus" },
                            { label: "Health Problems", name: "healthProblems" },
                            { label: "Caste", name: "caste" },
                        ].map((input) => (
                            <div key={input.name} className="goveSc-form-group">
                                <label>{input.label}</label>
                                <input
                                    type="text"
                                    name={input.name}
                                    placeholder={input.label}
                                    value={formData[input.name]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <button className="goveSc-register-btn" type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GoveScForm;
