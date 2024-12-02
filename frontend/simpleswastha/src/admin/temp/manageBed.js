import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/manageBed.css';

export default function ManageBed() {
  // Mock data for wards and beds
  const [wards, setWards] = useState({
    "Ward A": [
      { bed_id: 1, status: 'vacant' },
      { bed_id: 2, status: 'occupied' },
      { bed_id: 3, status: 'maintenance' },
    ],
    "Ward B": [
      { bed_id: 4, status: 'vacant' },
      { bed_id: 5, status: 'occupied' },
    ],
    "Ward C": [
      { bed_id: 6, status: 'vacant' },
      { bed_id: 7, status: 'maintenance' },
    ],
  });

  const [modalData, setModalData] = useState({
    bedNumber: '',
    wardName: '',
    status: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal and set modal data
  const handleBedClick = (bed, wardName) => {
    setModalData({
      bedNumber: bed.bed_id,
      wardName,
      status: bed.status,
    });
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Update the status of a bed and reflect changes in the UI
  const handleStatusChange = (status) => {
    const updatedWards = { ...wards };
    const wardBeds = updatedWards[modalData.wardName];
    const bedIndex = wardBeds.findIndex((bed) => bed.bed_id === modalData.bedNumber);

    if (bedIndex !== -1) {
      wardBeds[bedIndex].status = status;
    }

    setWards(updatedWards); // Update state with new bed status
    setIsModalOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div className="manageBed-container">
        <div className="manageBed-options">
          <Link to="/admin/addBed">
          <button className="manageBed-activity">
          ADD OR CREATE WARD DETAILS
          </button>
          </Link>
          <Link to="/admin/manageBed">
          <button className="manageBed-activity active">
          MANAGE BEDS
          </button>
          </Link>
          <Link to="/admin/bedNo"> <button className="addBed-activity"> MANAGE REQUEST
            </button></Link>
        </div>
        <div className="manageBed-content">
          <h3>Select Ward</h3>
          <div className="manageBed-select-ward">
            <input type="text" id="wardName" placeholder="Search Ward Name" />
          </div>
          <div className="manageBed-legend">
            <span>
              <div className="manageBed-circle occupied"></div>Occupied
            </span>
            <span>
              <div className="manageBed-circle vacant"></div>Vacant
            </span>
            <span>
              <div className="manageBed-circle maintenance"></div>Maintenance
            </span>
          </div>

          {Object.keys(wards).map((wardName) => (
            <div key={wardName}>
              <h3>{wardName}</h3>
              <div className="manageBed-beds">
                {wards[wardName].map((bed) => (
                  <div
                    key={bed.bed_id}
                    className={`manageBed-bed manageBed-${bed.status}`}
                    onClick={() => handleBedClick(bed, wardName)}
                  >
                    BED {bed.bed_id}
                    <br />
                    {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {isModalOpen && (
            <div className="manageBed-modal">
              <div className="manageBed-modal-content">
                <span className="manageBed-close" onClick={closeModal}>
                  &times;
                </span>
                <h3>Change Status of Bed {modalData.bedNumber} in {modalData.wardName}</h3>
                <p>Status: {modalData.status}</p>
                <div className="manageBed-modal-buttons">
                  <button onClick={() => handleStatusChange('vacant')}>Vacant</button>
                  <button onClick={() => handleStatusChange('occupied')}>Occupied</button>
                  <button onClick={() => handleStatusChange('maintenance')}>Maintenance</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
