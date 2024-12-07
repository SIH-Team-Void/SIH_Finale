import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/inventory.css';

export default function inventory() {
  return (
    <div className="invent-body">
    <Navbar />
      <div className="invent-options">
        <Link to="/admin/inventory">
          <button className="invent-activity">
          Home</button>
        </Link>
        <Link to="/admin/inventory/storage">
          <button className="invent-activity">
          Inventory
          </button>
        </Link>
        <Link to="/admin/inventory/sales">
          <button className="invent-activity">
          Sales
          </button>
        </Link>
        <Link to="/admin/inventory/vaim">
          <button className="invent-activity">
          VAIM
          </button>
        </Link>
      </div>
      <h1 className='inventory-heading'>Welcome, User</h1>
  <div class="button-container">
    <div class="row">
    <Link to="/admin/inventory/storage">
      <button class="button">Inventory Management</button>
      </Link>
      <Link to="/admin/inventory/sales">
      <button class="button">Create Sale</button>
      </Link>
    </div>
    <div class="row">
    <Link to="/admin/inventory/vaim">
      <button class="button">Vendor and Inventory Management</button>
      </Link>
    </div>
  </div>
      </div>
  )
}
