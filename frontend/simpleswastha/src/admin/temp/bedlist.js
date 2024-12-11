import React, { useState, useEffect } from 'react';
import Navbar from '../component/navbar';
import { Link } from 'react-router-dom';
import '../css/bedlist.css';

export default function Bedlist() {
  const [statistics, setStatistics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    const hosp_ID = localStorage.getItem('hosp_ID');
    try {
      // Fetch all required data
      const [admissionRes, deathRes, wardRes] = await Promise.all([
        fetch(`http://127.0.0.1:8000/bed_management/patient-admission/${hosp_ID}/`),
        fetch(`http://127.0.0.1:8000/bed_management/death-record/${hosp_ID}/`),
        fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`)
      ]);

      const admissionData = await admissionRes.json();
      const deathData = await deathRes.json();
      const wardData = await wardRes.json();

      // Process and organize the data
      const statsMap = new Map();

      // Process admissions
      admissionData.admissions.forEach(admission => {
        const date = admission.admission_date;
        const ward = admission.ward_name;
        const key = `${date}-${ward}`;

        if (!statsMap.has(key)) {
          statsMap.set(key, {
            date,
            ward,
            admissions: 0,
            sipouts: 0,
            deaths: 0,
            occupied: 0,
            vacant: 0
          });
        }
        statsMap.get(key).admissions++;
      });

      // Process deaths
      deathData.death_records?.forEach(record => {
        const date = record.death_date;
        const ward = record.ward_name;
        const key = `${date}-${ward}`;

        if (!statsMap.has(key)) {
          statsMap.set(key, {
            date,
            ward,
            admissions: 0,
            sipouts: 0,
            deaths: 0,
            occupied: 0,
            vacant: 0
          });
        }
        statsMap.get(key).deaths++;
      });

      // Process current bed status
      wardData.forEach(ward => {
        const today = new Date().toISOString().split('T')[0];
        const key = `${today}-${ward.ward_name}`;

        if (!statsMap.has(key)) {
          statsMap.set(key, {
            date: today,
            ward: ward.ward_name,
            admissions: 0,
            sipouts: 0,
            deaths: 0,
            occupied: 0,
            vacant: 0
          });
        }

        const stats = statsMap.get(key);
        stats.occupied = ward.beds.filter(bed => bed.status === 'occupied').length;
        stats.vacant = ward.beds.filter(bed => bed.status === 'vacant').length;
      });

      // Convert map to array and sort by date
      const sortedStats = Array.from(statsMap.values()).sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );

      setStatistics(sortedStats);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError('Failed to fetch data');
      setLoading(false);
    }
  };

  const handleShare = () => {
    // Implement share functionality
    alert('Share functionality will be implemented here');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bedlist-body'>
      <Navbar />
      <div className="manageBed-options">
        <Link to="/admin/addBed">
          <button className="manageBed-activity">
            ADD OR CREATE WARD DETAILS
          </button>
        </Link>
        <Link to="/admin/manageBed">
          <button className="manageBed-activity">
            MANAGE BEDS
          </button>
        </Link>
        <Link to="/admin/bedNo">
          <button className="bedNo-activity">
            MANAGE REQUEST
          </button>
        </Link>
        <Link to="/admin/bedlist">
          <button className="bedNo-activity active">
            BED LIST
          </button>
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Ward</th>
              <th>Admissions</th>
              <th>SIP Out</th>
              <th>Deaths</th>
              <th>Occupied</th>
              <th>Vacant</th>
            </tr>
          </thead>
          <tbody>
            {statistics.map((stat, index) => (
              <tr key={index}>
                <td>{new Date(stat.date).toLocaleDateString()}</td>
                <td>{stat.ward}</td>
                <td>{stat.admissions}</td>
                <td>{stat.sipouts}</td>
                <td>{stat.deaths}</td>
                <td>{stat.occupied}</td>
                <td>{stat.vacant}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <button 
        type="button" 
        className="bedlist-submit-btn"
        onClick={handleShare}
      >
        Share
      </button>
    </div>
  );
}