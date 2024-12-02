import React from 'react'
import '../css/signUp.css';

export default function signUp() {
  return (
    <div className="userReg-body">
       <div className="userReg-main-container">
       <span className="userReg-title">User Registration</span>
       <form action="" method="">
           <div className="userReg-sub-titles">
               <h3>Basic Details</h3>
           </div>
           <div className="userReg-form-row">
               <div className="userReg-form-group">
                   <label for="user_name">Name: </label>
                   <input type="text" id="user_name" name="user_name" placeholder="Enter Your Name" required />
               </div>
               <div className="userReg-form-group">
                   <label for="user_gender">Gender: </label>
                   <select id="user_gender" name="user_gender" required>
                       <option value="">Select Gender</option>
                       <option value="male">Male</option>
                       <option value="female">Female</option>
                       <option value="other">Other</option>
                   </select>
               </div>
           </div>
           <div className="userReg-form-row">
               <div className="userReg-form-group">
                   <label for="user_email">Email Address</label>
                   <input type="email" id="user_email" name="user_email" placeholder="Email Address" required />
               </div>
               <div className="userReg-form-group">
                   <label for="user_contact_no">Contact Number</label>
                   <input type="text" id="user_contact_no" name="user_contact_no" placeholder="Contact Number" required />
               </div>
               <div className="userReg-form-group">
                   <label for="image_url">Profile Pic</label>
                   <input type="file" id="image" name="image" placeholder="Enter Image" />
               </div>
           </div>
           <div className="userReg-form-row">
               <div className="userReg-form-group">
                   <label for="user_blood_group">Blood Group</label>
                   <select id="user_blood_group" name="user_blood_group" required>
                       <option value="">Select Blood Group</option>
                       <option value="A+">A+</option>
                       <option value="A-">A-</option>
                       <option value="B+">B+</option>
                       <option value="B-">B-</option>
                       <option value="O+">O+</option>
                       <option value="O-">O-</option>
                       <option value="AB+">AB+</option>
                       <option value="AB-">AB-</option>
                   </select>
               </div>
               <div className="userReg-form-group">
                   <label for="user_dob">Date of Birth</label>
                   <input type="date" id="user_dob" name="user_dob" required />
               </div>
           </div>
           <div className="userReg-form-row">
               <div className="userReg-form-group">
                   <label for="user_pass">Password: </label>
                   <input type="text" id="user_pass" name="user_pass" placeholder="Enter Password" required />
               </div>
               <div className="userReg-form-group">
                   <label for="user_cPass">Confirm Password: </label>
                   <input type="text" id="user_cPass" name="user_cPass" placeholder="Enter Password" required />
               </div>
           </div>
           <button type="submit" className="userReg-save">Submit</button>
       </form>
   </div>
   </div>
  )
}
