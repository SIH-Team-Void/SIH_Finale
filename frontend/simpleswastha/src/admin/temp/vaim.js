import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/vaim.css';

export default function inventory() {
  return (
    <div className="vaim-body">
    <Navbar />
      <div className="vaim-options">
        <Link to="/admin/inventory">
          <button className="vaim-activity">
          Home</button>
        </Link>
        <Link to="/admin/inventory/storage">
          <button className="vaim-activity">
          Inventory
          </button>
        </Link>
        <Link to="/admin/inventory/sales">
          <button className="vaim-activity">
          Sales
          </button>
        </Link>
        <Link to="/admin/inventory/vaim">
          <button className="vaim-activity">
          VAIM
          </button>
        </Link>
      </div>
      <div className="vaim-main-container">
     <span className="vaim-title">Vendor and Inventory Management </span>
     <form action="" method="">
         <div className="vaim-sub-titles">
             <h3>VENDOR DETAILS</h3>
         </div>
         <div className="vaim-form-row">
             <div className="vaim-form-group">
                 <label for="hosp_ID">Name</label>
                 <input type="number"id="hosp_ID" name="hosp_ID" placeholder="Enter your name" required />
             </div>

             <div className="vaim-form-group">
                 <label for="hosp_name">Contact number</label>
                 <input type="text" id="hosp_name" name="hosp_name" placeholder="Enter your mobile no." required />
             </div>
             <div className="vaim-form-group">
                 <label for="hosp_name">GSTIN</label>
                 <input type="text" id="hosp_name" name="hosp_name" placeholder="Enter your GSTIN number" required />
             </div>
         </div>


         <div className="vaim-form-row">
             <div className="vaim-form-group">
                 <label for="hosp_email">Number of Surgical Items</label>
                 <input type="email" id="hosp_email" name="hosp_email" placeholder="000" required />
             </div>
             <div className="vaim-form-group">
                 <label for="hosp_contact_no">Number of Medical Items</label>
                 <input type="text" id="hosp_contact_no" name="hosp_contact_no" placeholder="000" required />
             </div>
         </div>

         <div className="vaim-form-row">
         <div className="vaim-form-group">
             <label for="hosp_address">Address</label>
             <textarea id="hosp_address" name="hosp_address" placeholder="Enter Hospital Address" rows="3"  required ></textarea>
         </div>
         </div>


         <div className="vaim-sub-titles">
             <h3>Surgical Items </h3>
         </div>
         <div className="vaim-form-row">
         <div className="vaim-form-group">
             <label for="hosp_lat">Surgical item 1</label>
             <input type="text" id="hosp_lat" name="hosp_lat" placeholder="Item Name" required />
         </div>
         <div className="vaim-form-group">
             <label for="hosp_log">Quantity</label>
             <input type="text" id="hosp_log" name="hosp_log" placeholder="000" required />
         </div>
         <div className="vaim-form-group">
             <label for="hosp_log">Price per item</label>
             <input type="text" id="hosp_log" name="hosp_log" placeholder="000" required />
         </div>
         </div>

         <div className="vaim-form-group">
                   <label for="user_blood_group">Select Category</label>
                   <select id="user_blood_group" name="user_blood_group" required>
                       <option value="">Select Category</option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                   </select>
               </div>

         <div className="vaim-sub-titles">
             <h3>Medicinal Items </h3>
         </div>
         <div className="vaim-form-row">
         <div className="vaim-form-group">
             <label for="hosp_lat">Medicinal item 1</label>
             <input type="text" id="hosp_lat" name="hosp_lat" placeholder="Item Name" required />
         </div>
         <div className="vaim-form-group">
             <label for="hosp_log">Quantity</label>
             <input type="text" id="hosp_log" name="hosp_log" placeholder="000" required />
         </div>
         <div className="vaim-form-group">
             <label for="hosp_log">Price per item</label>
             <input type="text" id="hosp_log" name="hosp_log" placeholder="000" required />
         </div>
         </div>

         <div className="vaim-form-group">
                   <label for="user_blood_group">Select Category</label>
                   <select id="user_blood_group" name="user_blood_group" required>
                       <option value="">Select Category</option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                       <option value=""></option>
                   </select>
               </div>

         <button type="submit" className="vaim-save">Submit</button>
     </form>
 </div>
      </div>
  )
}
