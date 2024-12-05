import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/sales.css';

export default function inventory() {
  return (
    <div className="sales-body">
    <Navbar />
      <div className="sales-options">
        <Link to="/admin/inventory">
          <button className="sales-activity">
          Home</button>
        </Link>
        <Link to="/admin/inventory/storage">
          <button className="sales-activity">
          Inventory
          </button>
        </Link>
        <Link to="/admin/inventory/sales">
          <button className="sales-activity">
          Sales
          </button>
        </Link>
        <Link to="/admin/inventory/vaim">
          <button className="sales-activity">
          VAIM
          </button>
        </Link>
      </div>
      <form >
          <h3>Create sales</h3>
          <div className="sales-form-row">
            <div className="sales-form-group">
              <label htmlFor="Name">Customer Name</label>
              <input type="text" id="Name" name="Name" placeholder="Customer Name" required />
            </div>
            <div className="sales-form-group">
              <label htmlFor="">Customer contact</label>
              <input type="number" id="" name="" placeholder="Customer contact" required />
            </div>
          </div>
        </form>

        <form>
          <h3>Items</h3>
          <div className="sales-form-row">
              <div className="sales-form-group">
                   <label for="user_blood_group">Select items</label>
                   <select id="user_blood_group" name="user_blood_group" required>
                       <option value="">Select items</option>
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
            <div className="sales-form-group">
              <label htmlFor="day">Quantity</label>
              <input type="number" id="day" name="day" placeholder="Day of Week" required />
            </div>
          </div>
          <button className="sales-register-btn" type="submit">Add Item</button>
          <button className="sales-register-btn" type="submit">Submit Sale</button>
        </form>
      </div>
  )
}
