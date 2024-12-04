import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import searchIcon from "../img/search.png";
import "../css/opdDr.css";
import Navbar from '../userComponents/userNavbar';
import femaleDr1 from "../img/femaleDr1.png"; 
import maleDr1 from "../img/femaleDr1.png"; 

export default function OpdDr() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  // Fetch doctors from the backend
  useEffect(() => {
    axios.get("http://localhost:8000/api/doctors/")
      .then(response => setDoctors(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);


  const handleDoctorClick = (doctor) => {
    sessionStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    const selectedDoctor = JSON.parse(sessionStorage.getItem('selectedDoctor'));
    console.log(selectedDoctor);
    navigate("/user/opdDrSc"); 
  };

  return (
    <div className="opdDr-body">
      <Navbar />
      <section>
        <div className="opdDr-drSection">
          <div className="opdDr-search">
            <img src={searchIcon} alt="search" />
            <div className="opdDr-search-bar">
              <input type="text" placeholder="Search By Hospital's Name" />
            </div>
          </div>
          <div className="opdDr-Dr-list">
            {doctors.map((doctor) => (
              <div className="opdDr-Dr-card" key={doctor.doctor_id}>
                <img 
                  src={doctor.gender === "Female" ? femaleDr1 : maleDr1} // Adjust this based on dynamic images
                  alt={doctor.doctor_name} 
                />
                <div className="opdDr-Dr-div">
                  <div className="opdDr-Dr-info">
                    <h3>{doctor.doctor_name}</h3>
                    <p>{doctor.education}</p>
                  </div>
                  <div className="opdDr-Dr-details">
                    <div className="opdDr-Dr-cost">
                      <div className="opdDr-Dr-fee">
                        <h3>₹ {doctor.fees}</h3>
                        <span>Doctors Fees</span>
                      </div>
                    </div>
                    <button onClick={() => handleDoctorClick(doctor)} className="opdDr-btn">
                      View Doctor's Schedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
