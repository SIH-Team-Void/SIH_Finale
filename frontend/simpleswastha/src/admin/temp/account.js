import React, { useState } from 'react';
import Navbar from '../component/navbar';
import '../css/account.css';
import UserImage from '../img/elon.png';

export default function Account() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hospitalInfo, setHospitalInfo] = useState({
    hospitalId: '',
    hospitalName: '',
    address: '',
    latitude: '',
    longitude: '',
    contactNo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHospitalInfo({
      ...hospitalInfo,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Implement logic to save the hospital details
    console.log('Saving hospital details: ', hospitalInfo);
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="account-body">
      <Navbar />
      <div className="account-profile-section">
        <img src={UserImage} alt="Elon Chacha" className="account-profile-pic" />
        <h2>Elon Chacha</h2>
        <p>elon415@gmail.com</p>
        <p><strong>Address:</strong><br />Uske ghar ka address usko pataa. Uske ghar ka address usko pataa.</p>
        <p><strong>Phone no:</strong><br />+91 8801838989</p>
        <button className="account-change-password" onClick={openModal}>Complete Profile</button>
      </div>

      {/* Modal for Editing Profile */}
      <div
        id="userAccountModal"
        className="account-modal"
        style={{ display: isModalOpen ? 'block' : 'none' }}
      >
        <div className="account-modal-content">
          <span className="account-close" onClick={closeModal}>&times;</span>
          <form>
            <div className="account-form-row">
              <div className="account-form-group">
                <label htmlFor="hospitalId">Hospital ID:</label>
                <input
                  type="text"
                  id="hospitalId"
                  name="hospitalId"
                  value={hospitalInfo.hospitalId}
                  onChange={handleInputChange}
                  placeholder="Enter Hospital ID"
                />
              </div>
              <div className="account-form-group">
                <label htmlFor="hospitalName">Hospital Name:</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={hospitalInfo.hospitalName}
                  onChange={handleInputChange}
                  placeholder="Enter Hospital Name"
                />
              </div>
            </div>
            <div className="account-form-row">
              <div className="account-form-group">
                <label htmlFor="address">Address:</label>
                <textarea
                  id="address"
                  name="address"
                  value={hospitalInfo.address}
                  onChange={handleInputChange}
                  placeholder="Enter Address"
                />
              </div>
              <div className="account-form-group">
                <label htmlFor="latitude">Latitude:</label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  value={hospitalInfo.latitude}
                  onChange={handleInputChange}
                  placeholder="Enter Latitude"
                />
              </div>
            </div>
            <div className="account-form-row">
              <div className="account-form-group">
                <label htmlFor="longitude">Longitude:</label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  value={hospitalInfo.longitude}
                  onChange={handleInputChange}
                  placeholder="Enter Longitude"
                />
              </div>
              <div className="account-form-group">
                <label htmlFor="contactNo">Contact No:</label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  value={hospitalInfo.contactNo}
                  onChange={handleInputChange}
                  placeholder="Enter Contact No"
                />
              </div>
            </div>
            <div className="account-form-group">
              <button type="button" onClick={handleSave}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
