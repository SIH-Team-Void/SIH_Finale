import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/navbar";
import "../css/storage.css";

const CATEGORY_SUBCATEGORY_MAP = {
  surgical: [
    { value: "red", label: "Red", disposalMethods: ["Autoclave", "Incineration", "Chemical Disinfection"] },
    { value: "yellow", label: "Yellow", disposalMethods: ["Incineration", "Landfill"] },
    { value: "blue", label: "Blue", disposalMethods: ["Recycling", "General Waste"] },
    { value: "white", label: "White", disposalMethods: ["Sterilization", "Disinfection"] },
    { value: "black", label: "Black", disposalMethods: ["Hazardous Waste Disposal", "Chemical Treatment"] },
  ],
  medicines: [
    { value: "antibiotics", label: "Antibiotics", disposalMethods: ["Pharmaceutical Waste Disposal", "Chemical Neutralization"] },
    { value: "painkillers", label: "Painkillers", disposalMethods: ["Pharmaceutical Waste Disposal", "Chemical Neutralization"] },
  ],
};

// Disposal Method Popup Component
const DisposalMethodPopup = ({ item, onClose, onConfirm }) => {
  const [selectedDisposalMethods, setSelectedDisposalMethods] = useState([]);
  
  // Find the subcategory details
  const subcategoryDetails = CATEGORY_SUBCATEGORY_MAP[item.Inv_category]?.find(
    sub => sub.value === item.Inv_subcategory
  );

  const handleMethodChange = (method) => {
    setSelectedDisposalMethods(prev => 
      prev.includes(method)
        ? prev.filter(m => m !== method)
        : [...prev, method]
    );
  };

  const handleConfirm = () => {
    if (selectedDisposalMethods.length > 0) {
      onConfirm(selectedDisposalMethods);
    } else {
      alert("Please select at least one disposal method");
    }
  };

  return (
    //<div className="storage-forminputs" id="formContent">

    <div  className="storage-forminputs" id="formContent">
      <div className="storage-form-group">
        <h2>Disposal Method for {item.Inv_name}</h2>
        <p>Category: {item.Inv_category} - Subcategory: {item.Inv_subcategory}</p>
        <div className="disposal-methods">
          {subcategoryDetails?.disposalMethods.map(method => (
            <label htmlFor="Inv_quantity" key={method} className="disposal-method-checkbox">
              <input
                name="Inv_name"
                placeholder="Item Name"
                type="checkbox"
                checked={selectedDisposalMethods.includes(method)}
                onChange={() => handleMethodChange(method)}
              />
              {method}
            </label>
          ))}
        </div>
        <div className="disposal-popup-actions">
          <button type="submit" className="storage-save" onClick={handleConfirm}>Confirm Disposal</button>
          <button type="submit" className="storage-save" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({
    Inv_name: "",
    Inv_quantity: 0,
    Inv_price_per_item: 0,
    Inv_category: "",
    Inv_subcategory: "",
    Inv_vendor: "",
    batch_number:"",
    expiry_date: "",
  });
  const [editId, setEditId] = useState(null);
  const [disposalItem, setDisposalItem] = useState(null);

  // Fetch inventory from the backend
  const fetchInventory = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/inventory/");
      if (response.ok) {
        const data = await response.json();
        setInventory(data);
      } else {
        console.error("Failed to fetch inventory:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "Inv_quantity" || name === "Inv_price_per_item" ? Number(value) : value,
    });
  };

  useEffect(() => {
    if (!CATEGORY_SUBCATEGORY_MAP[formData.Inv_category]?.find(sub => sub.value === formData.Inv_subcategory)) {
      setFormData((prevData) => ({ ...prevData, Inv_subcategory: "" }));
    }
  }, [formData.Inv_category]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://127.0.0.1:8000/api/inventory/${editId}/`
      : "http://127.0.0.1:8000/api/inventory/";
    const method = editId ? "PUT" : "POST";
  
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        fetchInventory();
        setFormData({
          Inv_name: "",
          Inv_quantity: 0,
          Inv_price_per_item: 0,
          Inv_category: "",
          Inv_subcategory: "",
          Inv_vendor: "",
          batch_number:"",
          expiry_date: "",
        });
        setEditId(null);
      } else {
        console.error("Error saving inventory:", await response.json());
      }
    } catch (error) {
      console.error("Error saving inventory:", error);
    }
    
  };
  
  // Handle item deletion with disposal method
  const handleDelete = async (item) => {
    // For expired items, show disposal method popup
    if (isExpired(item.expiry_date)) {
      setDisposalItem(item);
      return;
    }

    // For non-expired items, proceed with standard delete confirmation
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/inventory/${item.Inv_id}/`, {
        method: "DELETE",
      });

      if (response.ok) fetchInventory();
      else console.error("Failed to delete inventory:", response.statusText);
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  // Confirm disposal of expired item
  const confirmDisposal = async (disposalMethods) => {
    if (!disposalItem) return;

    try {
      // You might want to send disposal methods to your backend
      const response = await fetch(`http://127.0.0.1:8000/api/inventory/${disposalItem.Inv_id}/`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          disposalMethods,
          disposalReason: "Expired"
        }),
      });

      if (response.ok) {
        fetchInventory();
        setDisposalItem(null);
      } else {
        console.error("Failed to dispose of inventory:", await response.json());
      }
    } catch (error) {
      console.error("Error disposing of inventory:", error);
    }
  };

  // Handle item editing
  const handleEdit = (item) => {
    setFormData({
      Inv_name: item.Inv_name,
      Inv_quantity: item.Inv_quantity,
      Inv_price_per_item: item.Inv_price_per_item,
      Inv_category: item.Inv_category,
      Inv_subcategory: item.Inv_subcategory,
      Inv_vendor: item.Inv_vendor,
      batch_number:item.batch_number,
      expiry_date: item.expiry_date,
    });
    setEditId(item.Inv_id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filter expired items
  const isExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  const expiredItems = inventory.filter((item) => isExpired(item.Inv_expiry_date));
  const lowStockItems = inventory.filter((item) => item.Inv_quantity < 10);
  const normalItems = inventory.filter(
    (item) => !isExpired(item.Inv_expiry_date) && item.Inv_quantity >= 10
  );

  // Render inventory table
  const InventoryTable = ({ items, tableTitle }) => (
    <div className="inventory-section">
      <h3 className="table-title">{tableTitle}</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price per Item</th>
            <th>Total Price</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Vendor</th>
            <th>Batch Number</th>
            <th>Expiry Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.Inv_id}>
              <td>{item.Inv_id}</td>
              <td>{item.Inv_name}</td>
              <td>{item.Inv_quantity}</td>
              <td>{item.Inv_price_per_item}</td>
              <td>{item.Inv_quantity * item.Inv_price_per_item}</td>
              <td>{item.Inv_category}</td>
              <td>{item.Inv_subcategory}</td>
              <td>{item.Inv_vendor}</td>
              <td>{item.batch_number}</td>
              <td>{new Date(item.expiry_date).toLocaleDateString()}</td>
              <td className="storage-actions">
                <button className="storage-update-btn" onClick={() => handleEdit(item)}>
                  Edit Details
                </button>
                <button
                  className="storage-delete-btn"
                  onClick={() => handleDelete(item)}
                >
                  {isExpired(item.expiry_date) ? "Dispose" : "Delete Stock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="storage-body">
      <Navbar />
      <div className="storage-options">
        <Link to="/admin/inventory">
          <button className="storage-activity">Home</button>
        </Link>
        <Link to="/admin/inventory/storage">
          <button className="storage-activity">Inventory</button>
        </Link>
        <Link to="/admin/inventory/sales">
          <button className="storage-activity">Sales</button>
        </Link>
        <Link to="/admin/inventory/vaim">
          <button className="storage-activity">VAIM</button>
        </Link>
      </div>

      <div className="storage-forminputs" id="formContent">
        <form onSubmit={handleSubmit}>
          <div className="storage-form-row">
            <div className="storage-form-group">
              <label htmlFor="Inv_name">Item Name</label>
              <input
                type="text"
                name="Inv_name"
                placeholder="Item Name"
                value={formData.Inv_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="storage-form-group">
              <label htmlFor="Inv_quantity">Quantity</label>
              <input
                type="number"
                name="Inv_quantity"
                placeholder="Quantity"
                value={formData.Inv_quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="storage-form-group">
              <label htmlFor="Inv_price_per_item">Price per item</label>
              <input
                type="number"
                name="Inv_price_per_item"
                placeholder="Price per item"
                value={formData.Inv_price_per_item}
                onChange={handleChange}
                required
              />
            </div>
            <div className="storage-form-group">
              <label htmlFor="Inv_category">Select Category</label>
              <select
                name="Inv_category"
                value={formData.Inv_category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="surgical">Surgical</option>
                <option value="medicines">Medicines</option>
              </select>
            </div>
          </div>
          <div className="storage-form-row">
          <div className="storage-form-group">
              <label htmlFor="Inv_subcategory">Subcategory</label>
              <select
                name="Inv_subcategory"
                value={formData.Inv_subcategory}
                onChange={handleChange}
                required={!!formData.Inv_category}
              >
                <option value="">Select Subcategory</option>
                {CATEGORY_SUBCATEGORY_MAP[formData.Inv_category]?.map((sub) => (
                  <option key={sub.value} value={sub.value}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="storage-form-group">
              <label htmlFor="Inv_vendor">Vendor Name</label>
              <input
                type="text"
                name="Inv_vendor"
                placeholder="Vendor name"
                value={formData.Inv_vendor}
                onChange={handleChange}
              />
            </div>
            <div className="storage-form-group">
              <label htmlFor="Inv_vendor">Batch Number</label>
              <input
                type="text"
                name="batch_number"
                placeholder="Batch Number"
                value={formData.batch_number}
                onChange={handleChange}
              />
            </div>
            <div className="storage-form-group">
              <label htmlFor="expiry_date">Expiry Date</label>
              <input
                type="date"
                name="Inv_expiry_date"
                value={formData.Inv_expiry_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="storage-save">
            {editId ? "Update" : "Add"} Item
          </button>
        </form>

        {/* Disposal Method Popup */}
        {disposalItem && (
          <DisposalMethodPopup
            item={disposalItem}
            onClose={() => setDisposalItem(null)}
            onConfirm={confirmDisposal}
          />
        )}

        {expiredItems.length > 0 && (
          <InventoryTable items={expiredItems} tableTitle="Expired Items" />
        )}
        
        {lowStockItems.length > 0 && (
          <InventoryTable items={lowStockItems} tableTitle="Low Stock Items" />
        )}
        
        <InventoryTable items={normalItems} tableTitle="Current Inventory" />
      </div>
    </div>
  );
};

export default Inventory;