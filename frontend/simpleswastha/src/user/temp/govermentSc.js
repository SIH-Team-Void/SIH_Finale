import React, { useState, useEffect } from "react";
import "../css/govermentSc.css";
import Navbar from '../userComponents/userNavbar';
import SearchIcon from '../img/search.png';
import { Link } from 'react-router-dom';

const GovermentSc = () => {
  const [data, setData] = useState([]); // All fetched schemes
  const [filteredData, setFilteredData] = useState([]); // Filtered schemes to display
  const [filters, setFilters] = useState({
    state: "",
    age: "",
    income: "",
    gender: "",
    familySize: "",
    maritalStatus: "",
    healthProblems: "",
    case: "",
  }); // Filter states
  const [loading, setLoading] = useState(true); // Loading state
  const [selectedScheme, setSelectedScheme] = useState(null); // Selected scheme for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility

  // Fetch schemes data from the backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/schemes/") // Replace with your endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((fetchedData) => {
        setData(fetchedData);
        setFilteredData(fetchedData); // Initially display all schemes
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filters to schemes data
  useEffect(() => {
    if (data.length === 0) return;

    const filtered = data.filter((scheme) => {
      return (
        (filters.userState ? scheme.userState === filters.userState : true) &&
        (filters.userAge ? scheme.userAge === filters.userAge : true) &&
        (filters.income ? scheme.income === filters.income : true) &&
        (filters.gender ? scheme.gender === filters.gender : true) &&
        (filters.familySize ? scheme.familySize === filters.familySize : true) &&
        (filters.maritalStatus ? scheme.maritalStatus === filters.maritalStatus : true) &&
        (filters.healthProblems ? scheme.healthProblems === filters.healthProblems : true) &&
        (filters.case ? scheme.case === filters.case : true)
      );
    });
    setFilteredData(filtered);
  }, [filters, data]);

  // Handle modal open
  const openModal = (scheme) => {
    setSelectedScheme(scheme);
    setIsModalOpen(true);
  };

  // Handle modal close
  const closeModal = () => {
    setSelectedScheme(null);
    setIsModalOpen(false);
  };

  return (
    <div className="userGoveSc-body">
      <Navbar />
      <div className="userGoveSc-form-container">
        <div className="userGoveSc-forminputs" id="formContent">
          <h3 className="userGoveSc-title">View Government Schemes</h3>
          <form>
            <div className="userGoveSc-form-row">
              <div className="userGoveSc-form-group">
                <label htmlFor="state">Select State</label>
                <select id="state" name="state" value={filters.userState} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {[...new Set(data.map((item) => item.userState))].map((userState) => (
                    <option key={userState} value={userState}>
                      {userState}
                    </option>
                  ))}
                </select>
              </div>
              <div className="userGoveSc-form-group">
                <label htmlFor="age">Select Age</label>
                <select id="age" name="age" value={filters.userAge} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {[...new Set(data.map((item) => item.userAge))].map((userAge) => (
                    <option key={userAge} value={userAge}>
                      {userAge}
                    </option>
                  ))}
                </select>
              </div>
              <div className="userGoveSc-form-group">
                <label htmlFor="income">Income Group</label>
                <select id="income" name="income" value={filters.income} onChange={handleFilterChange}>
                  <option value="">Select Income Group</option>
                  {[...new Set(data.map((item) => item.income))].map((income) => (
                    <option key={income} value={income}>
                      {income}
                    </option>
                  ))}
                </select>
              </div>
              <div className="userGoveSc-form-group">
                <label htmlFor="gender">Gender</label>
                <select id="gender" name="gender" value={filters.gender} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {[...new Set(data.map((item) => item.gender))].map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="userGoveSc-form-row">
              <div className="userGoveSc-form-group">
                <label htmlFor="familySize">Family Size</label>
                <select id="familySize" name="familySize" value={filters.familySize} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {[...new Set(data.map((item) => item.familySize))].map((familySize) => (
                    <option key={familySize} value={familySize}>
                      {familySize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="userGoveSc-form-group">
                <label htmlFor="maritalStatus">Marital Status</label>
                <select id="maritalStatus" name="maritalStatus" value={filters.maritalStatus} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {[...new Set(data.map((item) => item.maritalStatus))].map((maritalStatus) => (
                    <option key={maritalStatus} value={maritalStatus}>
                      {maritalStatus}
                    </option>
                  ))}
                </select>
              </div>
              <div className="userGoveSc-form-group">
                <label htmlFor="healthProblems">Health Problems</label>
                <select id="healthProblems" name="healthProblems" value={filters.healthProblems} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {[...new Set(data.map((item) => item.healthProblems))].map((healthProblem) => (
                    <option key={healthProblem} value={healthProblem}>
                      {healthProblem}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="userGoveSc-form-group">
              <label htmlFor="case">Case</label>
              <select id="case" name="case" value={filters.caste} onChange={handleFilterChange}>
                <option value="">All</option>
                {[...new Set(data.map((item) => item.caste))].map((caseItem) => (
                  <option key={caseItem} value={caseItem}>
                    {caseItem}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>

      <section>
        <b className="userGoveSc-titles">Government Schemes</b>
        <div className="userGoveSc-lowerSection">
          <div className="userGoveSc-search">
            <img src={SearchIcon} alt="searchIcon" />
            <input className="userGoveSc-searchBox" placeholder="Search for schemes" />
          </div>

          <div className="userGoveSc-cardSection">
            {filteredData.map((scheme) => (
              <div key={scheme.id} className="userGoveSc-card">
                <h4>{scheme.schemeName}</h4>
                <samp>{scheme.schemeDescription.substring(0, 100)}...</samp>
                <button className="userGoveSc-register-btn" onClick={() => openModal(scheme)}>
                  View
                </button>
              </div>

            

            ))}
          </div>
        </div>
      </section>

      {isModalOpen && selectedScheme && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedScheme.schemeName}</h2>
            <p>{selectedScheme.schemeDescription}</p>
              <span><strong>State:</strong> {selectedScheme.userState}</span>
              <span><strong>Age:</strong> {selectedScheme.userAge}</span>
              <span><strong>Income Group:</strong> {selectedScheme.income}</span>
              <span><strong>Gender:</strong> {selectedScheme.gender}</span>
              <span><strong>Family Size:</strong> {selectedScheme.familySize}</span>
              <span><strong>Marital Status:</strong> {selectedScheme.maritalStatus}</span><br />
              <span><strong>Health Problems:</strong> {selectedScheme.healthProblems}</span>
              <span><strong>Case:</strong> {selectedScheme.caste}</span> <br /><br />
            <a href={selectedScheme.schemeUrl} target="_blank" rel="noopener noreferrer" className="read-more-btn">
              Read More
            </a>
            <p className="govScmodal-close-btn" onClick={closeModal}>
              X
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovermentSc;
