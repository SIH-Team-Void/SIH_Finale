import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../component/navbar";
import "../css/sales.css";

export default function Inventory() {
  const [sale, setSale] = useState({
    customer_name: "",
    customer_contact: "",
    sale_date: "",
    total_amount: 0, // Initialize as 0 for calculation
    doctor_suggest: "",
    items: [{ inventory: "", quantity: "", price_per_item: "" }],
  });

  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/inventory/")
      .then((response) => setInventoryList(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Update sale state
  const handleChange = (e) => {
    setSale({ ...sale, [e.target.name]: e.target.value });
  };

  // Update items in sale and recalculate total
  const handleItemChange = (index, e) => {
    const newItems = [...sale.items];
    newItems[index][e.target.name] = e.target.value;

    // Calculate total amount
    const total = newItems.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const price = parseFloat(item.price_per_item) || 0;
      return sum + quantity * price;
    }, 0);

    setSale({ ...sale, items: newItems, total_amount: total });
  };

  const addItem = () => {
    setSale({
      ...sale,
      items: [...sale.items, { inventory: "", quantity: "", price_per_item: "" }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Save the sale
      const saleResponse = await axios.post("http://127.0.0.1:8000/api/sales/", {
        customer_name: sale.customer_name,
        customer_contact: sale.customer_contact,
        sale_date: sale.sale_date,
        total_amount: sale.total_amount,
        doctor_suggest: sale.doctor_suggest,
      });

      const saleId = saleResponse.data.id; // Assuming the sale ID is returned

      // Step 2: Save sale items and update inventory
      const itemRequests = sale.items.map((item) => {
        return axios.post("http://127.0.0.1:8000/api/sale-items/", {
          sale: saleId,
          inventory: item.inventory,
          quantity: item.quantity,
          price_per_item: item.price_per_item,
        });
      });

      // Await all item saves
      await Promise.all(itemRequests);

      alert("Sale and items saved successfully!");
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the sale or items.");
    }
  };

  return (
    <div className="sales-body">
      <Navbar />
      <div className="sales-options">
        <Link to="/admin/inventory">
          <button className="sales-activity">Home</button>
        </Link>
        <Link to="/admin/inventory/storage">
          <button className="sales-activity">Inventory</button>
        </Link>
        <Link to="/admin/inventory/sales">
          <button className="sales-activity">Sales</button>
        </Link>
        <Link to="/admin/inventory/vaim">
          <button className="sales-activity">VAIM</button>
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Create Sale</h3>
        <div className="sales-form-row">
          <div className="sales-form-group">
            <label htmlFor="customer_name">Customer Name</label>
            <input
              type="text"
              id="customer_name"
              name="customer_name"
              placeholder="Customer Name"
              value={sale.customer_name}
              onChange={handleChange}
              required
            />
            <label htmlFor="customer_contact">Customer Contact</label>
            <input
              type="text"
              id="customer_contact"
              name="customer_contact"
              placeholder="Customer Contact"
              value={sale.customer_contact}
              onChange={handleChange}
              required
            />
            <label htmlFor="sale_date">Sale Date</label>
            <input
              type="datetime-local"
              id="sale_date"
              name="sale_date"
              value={sale.sale_date}
              onChange={handleChange}
              required
            />
            <label htmlFor="doctor_suggest">Doctor Suggest</label>
            <input
              type="text"
              id="doctor_suggest"
              name="doctor_suggest"
              placeholder="Doctor Suggest"
              value={sale.doctor_suggest}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <h3>Items</h3>
        {sale.items.map((item, index) => (
          <div className="sales-form-row" key={index}>
            <div className="sales-form-group">
              <label htmlFor={`inventory-${index}`}>Select Item</label>
              <select
                id={`inventory-${index}`}
                name="inventory"
                value={item.inventory}
                onChange={(e) => handleItemChange(index, e)}
                required
              >
                <option value="">Select</option>
                {inventoryList.map((inv) => (
                  <option key={inv.Inv_id} value={inv.Inv_id}>
                    {inv.Inv_name} (Stock: {inv.Inv_quantity})
                  </option>
                ))}
              </select>
            </div>
            <div className="sales-form-group">
              <label htmlFor={`quantity-${index}`}>Quantity</label>
              <input
                type="number"
                id={`quantity-${index}`}
                name="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
            </div>
            <div className="sales-form-group">
              <label htmlFor={`price_per_item-${index}`}>Price Per Item</label>
              <input
                type="number"
                id={`price_per_item-${index}`}
                name="price_per_item"
                placeholder="Price Per Item"
                value={item.price_per_item}
                onChange={(e) => handleItemChange(index, e)}
                required
              />
            </div>
          </div>
        ))}
        <button type="button" className="sales-register-btn" onClick={addItem}>
          Add Item
        </button>
        <h4>Total Amount: ₹{sale.total_amount.toFixed(2)}</h4>
        <button type="submit" className="sales-register-btn">
          Submit Sale
        </button>
      </form>
    </div>
  );
}
