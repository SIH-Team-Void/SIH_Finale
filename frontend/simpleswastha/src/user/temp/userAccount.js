import React, { useState } from 'react';
import Navbar from '../userComponents/userNavbar';
import '../css/userAccount.css';
import UserImage from '../img/elon.png';

export default function UserAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="userAccount-body">
      <Navbar />
      <div className="userAccount-profile-section">
        <img src={UserImage} alt="Elon Chacha" className="userAccount-profile-pic" />
        <h2>Elon Chacha</h2>
        <p>elon415@gmail.com</p>
        <p>
          <strong>Address:</strong>
          <br />
          Uske ghar ka addres usko pataa. Uske ghar ka addres usko pataa Uske ghar ka addres usko pataa
        </p>
        <p>
          <strong>Phone no:</strong>
          <br />
          +91 8801838989
        </p>
        <button className="userAccount-change-password" onClick={openModal}>
          Complete profile
        </button>
      </div>

      <div
        id="userAccountModal"
        className="userAccount-modal"
        style={{ display: isModalOpen ? 'block' : 'none' }}
      >
        <div className="userAccount-modal-content">
          <span className="userAccount-close" onClick={closeModal}>
            &times;
          </span>
          <form>
            <p>Profile</p>
            <div className="userAccount-form-row">
              <div className="userAccount-form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" />
              </div>
              <div className="userAccount-form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Enter your email" />
              </div>
              <div className="userAccount-form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" name="phone" placeholder="Enter your phone number" />
              </div>
            </div>
            <div className="userAccount-form-row">
              <div className="userAccount-form-group">
                <label htmlFor="bloodGroup">Blood Group:</label>
                <select id="bloodGroup" name="bloodGroup">
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div className="userAccount-form-group">
                <label htmlFor="gender">Gender:</label>
                <select id="gender" name="gender">
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="userAccount-form-group">
                <label htmlFor="birthDate">Birth Date:</label>
                <input type="date" id="birthDate" name="birthDate" />
              </div>
            </div>
            <div className="userAccount-form-group">
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
