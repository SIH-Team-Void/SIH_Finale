import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/storage.css';

export default function inventory() {
  return (
    <div className="storage-body">
    <Navbar />
      <div className="storage-options">
        <Link to="/admin/inventory">
          <button className="storage-activity">
          Home</button>
        </Link>
        <Link to="/admin/inventory/storage">
          <button className="storage-activity">
          Inventory
          </button>
        </Link>
        <Link to="/admin/inventory/sales">
          <button className="storage-activity">
          Sales
          </button>
        </Link>
        <Link to="/admin/inventory/vaim">
          <button className="storage-activity">
          VAIM
          </button>
        </Link>
      </div>
      <div className="storage-forminputs" id="formContent">
          <form>
            <div className="storage-form-row">
              <div className="storage-form-group">
                <label htmlFor="name">Item Name</label>
                <input type="name" id="name" placeholder="Item Name" />
              </div>
              <div className="storage-form-group">
                <label htmlFor="dr">Quatity</label>
                <input
                  type="number"
                  placeholder="Quatity"
                />
              </div>
              <div className="storage-form-group">
                <label htmlFor="Department">Price per item</label>
                <input
                  type="number"
                  id=""
                  placeholder="Price per item"
                />
              </div>
              <div className="storage-form-group">
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
            </div>
            <div className="storage-form-row">
              <div className="storage-form-group">
                <label htmlFor="name">Vendor name</label>
                <input type="name" id="name" placeholder="Vendor name" />
              </div>
            </div>
            <button type="submit" className="storage-save">Add Item</button>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price per item</th>
                  <th>Total price</th>
                  <th>Category</th>
                  <th>Vendor</th>
                  <th>Actions</th>
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
                    <td className="storage-actions">
                      <div className="storage-status-input"> <button className="storage-update-btn"> Edit Details </button>
                        <button className="storage-delete-btn" > Delete Stock </button>
                      </div>
                    </td>
                  </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
  )
}
