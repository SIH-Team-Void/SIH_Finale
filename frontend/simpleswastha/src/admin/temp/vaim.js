import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/navbar";
import "../css/vaim.css";

const Inventory = () => {
  const [vendor, setVendor] = useState({
    name: "",
    contact_number: "",
    address: "",
    gstin: "",
    surgical: 0,
    medicinal: 0,
  });

  const [inventory, setInventory] = useState({
    surgicalItems: [],
    medicinalItems: [],
  });

  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setVendor((prev) => ({
      ...prev,
      [name]: name === "surgical" || name === "medicinal" ? Number(value) : value,
    }));
  };

  const handleInventoryChange = (type, index, field, value) => {
    setInventory((prev) => {
      const updatedItems = [...prev[type]];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: field === "quantity" || field === "price" ? Number(value) : value,
      };
      return { ...prev, [type]: updatedItems };
    });
  };

  const generateInventoryFields = (count, type) => {
    return Array.from({ length: count }).map((_, index) => (
      <div key={`${type}-${index}`} className="vaim-form-row">
        <div className="vaim-form-group">
          <label>Item Name</label>
          <input
            type="text"
            value={inventory[type][index]?.Inv_name || ""}
            onChange={(e) => handleInventoryChange(type, index, "Inv_name", e.target.value)}
            required
          />
        </div>
        <div className="vaim-form-group">
          <label>Quantity</label>
          <input
            type="number"
            value={inventory[type][index]?.Inv_quantity || ""}
            onChange={(e) => handleInventoryChange(type, index, "Inv_quantity", e.target.value)}
            required
          />
        </div>
        <div className="vaim-form-group">
          <label>Price per Item</label>
          <input
            type="number"
            value={inventory[type][index]?.Inv_price_per_item || ""}
            onChange={(e) => handleInventoryChange(type, index, "Inv_price_per_item", e.target.value)}
            required
          />
        </div>
        <div className="vaim-form-group">
          <label>Category</label>
          <select
            value={inventory[type][index]?.Inv_category || ""}
            onChange={(e) => handleInventoryChange(type, index, "Inv_category", e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="surgical">Surgical</option>
            <option value="medicinal">Medicinal</option>
          </select>
        </div>
      </div>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { surgical, medicinal, ...vendorDetails } = vendor;
    const payload = {
      Vendors: vendorDetails,
      Inventory: {
        surgical: inventory.surgicalItems,
        medicinal: inventory.medicinalItems,
      },
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/products-inventory/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Data submitted successfully!");
      } else {
        console.error("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="vaim-body">
      <Navbar />
      <div className="vaim-options">
        <Link to="/admin/inventory">
          <button className="vaim-activity">Home</button>
        </Link>
        <Link to="/admin/inventory/storage">
          <button className="vaim-activity">Inventory</button>
        </Link>
        <Link to="/admin/inventory/sales">
          <button className="vaim-activity">Sales</button>
        </Link>
        <Link to="/admin/inventory/vaim">
          <button className="vaim-activity">VAIM</button>
        </Link>
      </div>
      <div className="vaim-main-container">
        <h1 className="vaim-title">Vendor and Inventory Management</h1>
        <form onSubmit={handleSubmit}>
          <div className="vaim-sub-titles">
            <h3>Vendor Details</h3>
          </div>
          {/* Vendor Details Form */}
          <div className="vaim-form-row">
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Contact Number", name: "contact_number", type: "text" },
              { label: "GSTIN", name: "gstin", type: "text" },
              { label: "Address", name: "address", type: "text" },
              { label: "Number of Surgical Items", name: "surgical", type: "number" },
              { label: "Number of Medicinal Items", name: "medicinal", type: "number" },
            ].map(({ label, name, type }) => (
              <div key={name} className="vaim-form-group">
                <label>{label}</label>
                <input
                  type={type}
                  name={name}
                  value={vendor[name]}
                  onChange={handleVendorChange}
                  required
                />
              </div>
            ))}
          </div>

          {/* Surgical Items */}
          <div className="vaim-sub-titles">
            <h3>Surgical Items</h3>
          </div>
          {generateInventoryFields(vendor.surgical, "surgicalItems")}

          {/* Medicinal Items */}
          <div className="vaim-sub-titles">
            <h3>Medicinal Items</h3>
          </div>
          {generateInventoryFields(vendor.medicinal, "medicinalItems")}

          <button type="submit" className="vaim-save">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Inventory;
