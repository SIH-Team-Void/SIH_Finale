import React, { useState, useEffect } from "react";
import "../css/govermentSc.css";
import Navbar from '../userComponents/userNavbar';
import SearchIcon from '../img/search.png';
import RajaImage from '../img/raja.png';
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
        (filters.state ? scheme.state === filters.state : true) &&
        (filters.age ? scheme.age === filters.age : true) &&
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

  /*if (loading) {
    return <p>Loading data...</p>;
  }*/

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
                <select id="state" name="state" value={filters.state} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {[...new Set(data.map((item) => item.state))].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {filters.state && <p>Selected State: {filters.state}</p>} {/* Display selected state */}
              </div>
              <div className="userGoveSc-form-group">
                <label htmlFor="age">Select Age</label>
                <select id="age" name="age" value={filters.age} onChange={handleFilterChange}>
                  <option value="">All</option>
                  {[...new Set(data.map((item) => item.age))].map((age) => (
                    <option key={age} value={age}>
                      {age}
                    </option>
                  ))}
                </select>
                {filters.age && <p>Selected Age: {filters.age}</p>} {/* Display selected age */}
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
                {filters.income && <p>Selected Income Group: {filters.income}</p>} {/* Display selected income */}
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
                {filters.gender && <p>Selected Gender: {filters.gender}</p>} {/* Display selected gender */}
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
                {filters.familySize && <p>Selected Family Size: {filters.familySize}</p>} {/* Display selected family size */}
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
                {filters.maritalStatus && <p>Selected Marital Status: {filters.maritalStatus}</p>} {/* Display selected marital status */}
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
                {filters.healthProblems && <p>Selected Health Problems: {filters.healthProblems}</p>} {/* Display selected health problems */}
              </div>
            </div>

            <div className="userGoveSc-form-group">
              <label htmlFor="case">Case</label>
              <select id="case" name="case" value={filters.case} onChange={handleFilterChange}>
                <option value="">All</option>
                {[...new Set(data.map((item) => item.case))].map((caseItem) => (
                  <option key={caseItem} value={caseItem}>
                    {caseItem}
                  </option>
                ))}
              </select>
              {filters.case && <p>Selected Case: {filters.case}</p>} {/* Display selected case */}
            </div>

            <button className="userGoveSc-register-btn" type="submit" id="submitButton">Submit</button>
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
                  <p>{scheme.schemeDescription}</p>
                  <a href={`${scheme.schemeUrl}`} target="_blank" rel="noopener noreferrer">Read More</a>

                
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GovermentSc;
