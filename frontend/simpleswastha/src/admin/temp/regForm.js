// import React from 'react'
// import { Link } from 'react-router-dom';
// import '../css/regForm.css';

// export default function regForm() {
//   return (
//     <div className="reg-body">
//         <div className="reg-main-container">
//         <span className="reg-title">Hospital Registration</span>
//         <form action="" method="">
//             <div className="reg-sub-titles">
//                 <h3>Basic Details</h3>
//             </div>
//             <div className="reg-form-row">
//                 <div className="reg-form-group">
//                     <label for="hosp_ID">Hospital ID</label>
//                     <input type="number"id="hosp_ID" name="hosp_ID" placeholder="Enter Hospital ID" required />
//                 </div>



//                 <div className="reg-form-group">
//                     <label for="hosp_name">Hospital Name</label>
//                     <input type="text" id="hosp_name" name="hosp_name" placeholder="Enter Hospital Name" required />
//                 </div>
//             </div>


//             <div className="reg-form-row">
//                 <div className="reg-form-group">
//                     <label for="hosp_email">Hospital Email Address</label>
//                     <input type="email" id="hosp_email" name="hosp_email" placeholder="Hospital Email Address" required />
//                 </div>
//                 <div className="reg-form-group">
//                     <label for="hosp_contact_no">Hospital Contact Number</label>
//                     <input type="text" id="hosp_contact_no" name="hosp_contact_no" placeholder="Hospital Contact Number" required />
//                 </div>
//                 <div className="reg-form-group">
//                     <label for="image_url">Hospital Image URL</label>
//                     <input type="text" id="image_url" name="image_url" placeholder="Enter Image URL" />
//                 </div>
//             </div>
//             <div className="reg-sub-titles">
//                 <h3>Hospital Location</h3>
//             </div>
//             <div className="reg-form-row">
//             <div className="reg-form-group">
//                 <label for="hosp_lat">Hospital Latitude</label>
//                 <input type="text" id="hosp_lat" name="hosp_lat" placeholder="Enter Hospital Latitude" required />
//             </div>
//             <div className="reg-form-group">
//                 <label for="hosp_log">Hospital Longitude</label>
//                 <input type="text" id="hosp_log" name="hosp_log" placeholder="Enter Hospital Longitude" required />
//             </div>
//             </div>
//             <div className="reg-form-group">
//                 <label for="hosp_address">Hospital Address</label>
//                 <textarea id="hosp_address" name="hosp_address" placeholder="Enter Hospital Address" rows="3"  required ></textarea>
//             </div>
//             <div className="reg-sub-titles">
//                 <h3>Hospital Bed Capacity</h3>
//             </div>
//             <div className="reg-form-group">
//                 <label for="hosp_no_of_beds">Total Number of Beds</label>
//                 <input type="number" id="hosp_no_of_beds" name="hosp_no_of_beds" placeholder="Total Number of Beds" required />
//             </div>
//             <div className="reg-sub-titles">
//                 <h3>Create Password</h3>
//             </div>
//             <div className="reg-form-row">
//                 <div className="reg-form-group">
//                     <label for="hosp_password">Password</label>
//                     <input type="password" id="hosp_password" name="hosp_password" placeholder="Enter Password" required />
//                 </div>
//                 <div className="reg-form-group">
//                     <label for="hosp_Cpassword">Confirm Password</label>
//                     <input type="password" id="hosp_Cpassword" name="hosp_Cpassword" placeholder="Confirm Password" required />
//                 </div>
//             </div>
//             <Link to="/admin/home">
//                 <button type="submit" className="reg-save" id="submitButton">Submit</button>
//             </Link>
//             {/* <button type="submit" className="reg-save">Submit</button> */}
//         </form>
//     </div>
//     </div>
//   )
// }






import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/regForm.css';

export default function RegForm() {
  const [formData, setFormData] = useState({
    hosp_ID: '',
    hosp_name: '',
    hosp_email: '',
    hosp_contact_no: '',
    image_url: '',
    hosp_lat: '',
    hosp_log: '',
    hosp_address: '',
    hosp_no_of_beds: '',
    hosp_password: '',
    hosp_Cpassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/hospital/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Hospital registered successfully!');
        navigate('/admin/home');
      } else {
        // Handle validation errors
        const errorMessages = Object.values(data).flat().join('\n');
        alert(`Registration failed:\n${errorMessages}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <div className="reg-body">
      <div className="reg-main-container">
        <span className="reg-title">Hospital Registration</span>
        <form onSubmit={handleSubmit}>
          {/* Rest of your existing form remains the same, 
              but add onChange={handleChange} to each input 
              and value={formData.fieldName} */}
          <div className="reg-form-row">
            <div className="reg-form-group">
              <label htmlFor="hosp_ID">Hospital ID</label>
              <input 
                type="number" 
                id="hosp_ID" 
                name="hosp_ID" 
                placeholder="Enter Hospital ID" 
                value={formData.hosp_ID}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="reg-form-group">
                 <label htmlFor="hosp_name">Hospital Name</label>
                  <input type="text"
                  id="hosp_name"
                  name="hosp_name"
                  placeholder="Enter Hospital Name"
                  value={formData.hosp_name}
                  onChange={handleChange}
                  required
                 />
               </div>   
          </div>

          <div className="reg-form-row">
                 <div className="reg-form-group">
                     <label htmlFor="hosp_email">Hospital Email Address</label>
                     <input type="email"
                     id="hosp_email"
                     name="hosp_email"
                     placeholder="Hospital Email Address"
                     value={formData.hosp_email}
                     onChange={handleChange}
                     required 
                     />
                 </div>
                <div className="reg-form-group">
                    <label htmlFor="hosp_contact_no">Hospital Contact Number</label>
                     <input type="text"
                     id="hosp_contact_no"
                     name="hosp_contact_no"
                     placeholder="Hospital Contact Number"
                     value={formData.hosp_contact_no}
                     onChange={handleChange}
                     required
                     />
                 </div>
                 <div className="reg-form-group">
                     <label htmlFor="image_url">Hospital Image URL</label>
                     <input type="text"
                     id="image_url"
                     name="image_url"
                     placeholder="Enter Image URL"
                     value={formData.image_url}
                     onChange={handleChange} 
                     />
                 </div>
             </div>

             <div className="reg-sub-titles">
                 <h3>Hospital Location</h3>
             </div>
             <div className="reg-form-row">
             <div className="reg-form-group">
                 <label htmlFor="hosp_lat">Hospital Latitude</label>
                 <input type="text"
                 id="hosp_lat"
                 name="hosp_lat"
                 placeholder="Enter Hospital Latitude"
                 value={formData.hosp_lat}
                 onChange={handleChange}
                 required 
                 />
             </div>
             <div className="reg-form-group">
                 <label htmlFor="hosp_log">Hospital Longitude</label>
                 <input type="text"
                 id="hosp_log"
                 name="hosp_log"
                 placeholder="Enter Hospital Longitude"
                 value={formData.hosp_log}
                 onChange={handleChange}
                 required />
             </div>
             </div>
             <div className="reg-form-group">
                 <label htmlFor="hosp_address">Hospital Address</label>
                 <textarea id="hosp_address"
                 name="hosp_address"
                 placeholder="Enter Hospital Address"
                 rows="3"
                 value={formData.hosp_address}
                 onChange={handleChange}  
                 required ></textarea>
             </div>
             <div className="reg-sub-titles">
                 <h3>Hospital Bed Capacity</h3>
             </div>
             <div className="reg-form-group">
                 <label htmlFor="hosp_no_of_beds">Total Number of Beds</label>
                 <input type="number"
                 id="hosp_no_of_beds"
                 name="hosp_no_of_beds"
                 placeholder="Total Number of Beds"
                 value={formData.hosp_no_of_beds}
                 onChange={handleChange}
                 required 
                 />
             </div>
             <div className="reg-sub-titles">
                 <h3>Create Password</h3>
             </div>
             <div className="reg-form-row">
                 <div className="reg-form-group">
                     <label htmlFor="hosp_password">Password</label>
                     <input type="password"
                     id="hosp_password"
                     name="hosp_password"
                     placeholder="Enter Password" 
                     value={formData.hosp_password}
                     onChange={handleChange}
                     required />
                 </div>
                 <div className="reg-form-group">
                     <label htmlFor="hosp_Cpassword">Confirm Password</label>
                     <input type="password"
                     id="hosp_Cpassword"
                     name="hosp_Cpassword"
                     placeholder="Confirm Password"
                     value={formData.hosp_Cpassword}
                     onChange={handleChange}
                     required />
                 </div>
             </div>
             {/* <Link to="/admin/home">
                 <button type="submit" className="reg-save" id="submitButton">Submit</button>
             </Link> */}



          
          <button type="submit" className="reg-save" id="submitButton">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}