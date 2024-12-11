import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/sales-analytics.css';

const SalesAnalytics = () => {
  const [salesData, setSalesData] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const salesResponse = await fetch('http://127.0.0.1:8000/api/sales/');
      const salesItems = await fetch('http://127.0.0.1:8000/api/sale-items/');
      const inventoryResponse = await fetch('http://127.0.0.1:8000/api/inventory/');

      if (salesResponse.ok && salesItems.ok && inventoryResponse.ok) {
        const sales = await salesResponse.json();
        const items = await salesItems.json();
        const inventory = await inventoryResponse.json();

        // Process recent sales
        const sortedSales = sales
          .sort((a, b) => new Date(b.sale_date) - new Date(a.sale_date))
          .slice(0, 5);

        setRecentSales(sortedSales);
        setInventoryData(inventory.filter(item => item.Inv_category === 'medicines'));

        // Process sales data for predictions
        const processedData = processSalesData(sales, items);
        setSalesData(processedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processSalesData = (sales, items) => {
    const dailySales = sales.reduce((acc, sale) => {
      const date = new Date(sale.sale_date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          date,
          total: 0,
          count: 0
        };
      }
      acc[date].total += parseFloat(sale.total_amount);
      acc[date].count += 1;
      return acc;
    }, {});

    return Object.values(dailySales).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
  };                                                   

  const calculatePredictions = (data) => {
    const windowSize = 7;
    return data.map((item, index) => {
      if (index < windowSize - 1) return { ...item, predicted: 0 };
      
      const window = data.slice(index - windowSize + 1, index + 1);
      const avgSales = window.reduce((sum, day) => sum + day.total, 0) / windowSize;
      
      return {
        ...item,
        predicted: avgSales
      };
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  const predictedData = calculatePredictions(salesData);
  const lastPrediction = predictedData[predictedData.length - 1];
  const predictedSales = lastPrediction ? lastPrediction.predicted.toFixed(2) : 'N/A';

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
      <div className="analytics-container">
        <h1 className="analytics-title">Sales Analytics Dashboard</h1>
        
        <div className="analytics-grid">
          <div className="analytics-card">
            <h2 className="card-title">Sales Prediction</h2>
            <div className="prediction-content">
              <div className="prediction-item">
                <h3>Predicted Sales (Next Day)</h3>
                <p className="prediction-value">₹{predictedSales}</p>
              </div>
              <div className="prediction-item">
                <h3>Today's Sales</h3>
                <p className="prediction-value">
                  ₹{salesData[salesData.length - 1]?.total.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
          </div>

          <div className="analytics-card">
            <h2 className="card-title">Recent Sales History</h2>
            <div className="table-container">
              <table className="analytics-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => (
                    <tr key={sale.id}>
                      <td>{new Date(sale.sale_date).toLocaleDateString()}</td>
                      <td>{sale.customer_name}</td>
                      <td>₹{parseFloat(sale.total_amount).toFixed(2)}</td>
                      <td>{sale.doctor_suggest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="analytics-card full-width">
          <h2 className="card-title">Medicine Inventory Status</h2>
          <div className="table-container">
            <table className="analytics-table">
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Current Stock</th>
                  <th>Price per Item</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item.Inv_id}>
                    <td>{item.Inv_name}</td>
                    <td>{item.Inv_quantity}</td>
                    <td>₹{parseFloat(item.Inv_price_per_item).toFixed(2)}</td>
                    <td>
                      <span className={`status-badge ${
                        item.Inv_quantity < 10 ? 'low-stock' : 'in-stock'
                      }`}>
                        {item.Inv_quantity < 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;