import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/addBed.css';

export default function AddBed() {
  const [wardName, setWardName] = useState('');
  const [noOfBeds, setNoOfBeds] = useState('');
  const [Cost, setBedCost] = useState('');
  const [wardImg, setWardImg] = useState('');
  const [wardDetails, setWardDetails] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const hosp_ID = localStorage.getItem('hosp_ID');

    try {
      const response = await fetch(`http://127.0.0.1:8000/bed_management/ward/add/${hosp_ID}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ward_name: wardName,
          no_of_beds: noOfBeds,
          cost: Cost,
          ward_img: wardImg,
          ward_details: wardDetails,
          hospital: hosp_ID
        })
      });
      if (!response.ok) {
        const text = await response.text();
        console.log('Error response:', text);
        throw new Error(`HTTP error! status: ${response.status}`);
    }

      const data = await response.json();

      if (response.ok) {
        // Ward added successfully
        console.log(data.message);
        navigate('/admin/manageBed'); // Redirect to manage beds page
      } else {
        // Failed to add ward
        setError(data.error || 'Failed to add ward');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="addBed-body">
      <Navbar />
      <div className="addBed-form-container">
        <div className="addBed-options">
          <Link to="/admin/addBed">
            <button className="addBed-activity">
              ADD OR CREATE WARD DETAILS
            </button>
          </Link>
          <Link to="/admin/manageBed">
            <button className="addBed-activity">
              MANAGE BEDS
            </button>
          </Link>
          <Link to="/admin/bedNo"> <button className="bedNo-activity"> MANAGE REQUEST
            </button></Link>
            <Link to="/admin/bedlist">
                        <button className="bedNo-activity">BED LIST</button>
                    </Link>
          
        </div>
        <div className="addBed-forminputs" id="formContent">
          <h3 className="addBed-title">ADD WARD DETAILS</h3>
          {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="addBed-form-row">
              <div className="addBed-form-group">
                <label htmlFor="addWard">Ward Name</label>
                <input 
                  type="text" 
                  id="addWard" 
                  name="ward_name" 
                  placeholder="Ward Name" 
                  value={wardName}
                  onChange={(e) => setWardName(e.target.value)}
                  required 
                />
              </div>
              <div className="addBed-form-group">
                <label htmlFor="bedNo">Number of Beds</label>
                <input 
                  type="number" 
                  id="bedNo" 
                  name="no_of_beds" 
                  placeholder="Number of Beds" 
                  value={noOfBeds}
                  onChange={(e) => setNoOfBeds(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="addBed-form-row">
              <div className="addBed-form-group">
                <label htmlFor="Cost">Cost per Bed</label>
                <input 
                  type="number" 
                  id="Cost" 
                  name="cost" 
                  placeholder="Cost per Bed" 
                  value={Cost}
                  onChange={(e) => setBedCost(e.target.value)}
                  required 
                />
              </div>
              <div className="addBed-form-group">
                <label htmlFor="wardImg">Ward Image</label>
                <input 
                  type="text" 
                  id="ward_img" 
                  name="ward_img" 
                  placeholder="Ward Image" 
                  value={wardImg}
                  onChange={(e) => setWardImg(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="addBed-form-group">
              <label htmlFor="wardDetails">Ward Details</label>
              <div className="addBed-wardDetails">
                <textarea 
                  id="wardDetails" 
                  name="ward_details" 
                  placeholder="Enter Ward Details" 
                  rows="3" 
                  value={wardDetails}
                  onChange={(e) => setWardDetails(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>
            <button 
              className="addBed-register-btn" 
              type="submit" 
              id="submitButton"
            >
              Add Ward
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../component/navbar';
// import '../css/addBed.css';

// export default function AddBed() {
//   return (
//     <div className="addBed-body">
//       <Navbar />
//       <div className="addBed-form-container">
//         <div className="addBed-options">
//           <Link to="/admin/addBed">
//           <button className="addBed-activity" >
//             ADD OR CREATE WARD DETAILS
//             </button>
//             </Link>
//           <Link to="/admin/manageBed"> <button className="addBed-activity"> MANAGE BEDS
//             </button></Link>
//         </div>
//         <div className="addBed-forminputs" id="formContent">
//           <h3 className="addBed-title">ADD WARD DETAILS</h3>
//           <form action="" method="">
//             <div className="addBed-form-row">
//               <div className="addBed-form-group">
//                 <label htmlFor="addWard">Ward Name</label>
//                 <input type="text" id="addWard" name="ward_name" placeholder="Ward Name" required />
//               </div>
//               <div className="addBed-form-group">
//                 <label htmlFor="bedNo">Number of Beds</label>
//                 <input type="number" id="bedNo" name="no_of_beds" placeholder="Number of Beds" required />
//               </div>
//             </div>
//             <div className="addBed-form-row">
//               <div className="addBed-form-group">
//                 <label htmlFor="bedCost">Cost per Bed</label>
//                 <input type="number" id="bedCost" name="bed_cost" placeholder="Cost per Bed" required />
//               </div>
//               <div className="addBed-form-group">
//                 <label htmlFor="bedNo">Ward Image</label>
//                 <input type="text" id="ward_img" name="ward_img" placeholder="Ward Image" required />
//               </div>
//             </div>
//             <div className="addBed-form-group">
//               <label htmlFor="wardDetails">Ward Details</label>
//               <div className="addBed-wardDetails">
//                 <textarea id="wardDetails" name="ward_details" placeholder="Enter Ward Details" rows="3" required></textarea>
//               </div>
//             </div>
//             <button className="addBed-register-btn" type="submit" id="submitButton">Add ward</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }