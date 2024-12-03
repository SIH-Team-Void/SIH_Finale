import React, { useState, useEffect } from 'react';
import Navbar from '../userComponents/userNavbar';
import '../css/userAccount.css';
import UserImage from '../img/elon.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function UserAccount() {
  const [userData, setUserData] = useState({
    id: '',
    username: '',
    email: '',
    phone_no: '',
    gender: '',
    blood_group: '',
    date_of_birth: '',
    role: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    try {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
      } else {
        navigate('/user');  // Redirect if no user data is found
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/user');  // Handle corrupted or invalid JSON gracefully
    }
  }, [navigate]);
  

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/user');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assumes token stored during login
      const response = await axios.put(`/api/users/${userData.id}/`, userData, {
        headers: { 'Authorization': `Token ${token}` }
      });
      localStorage.setItem('userData', JSON.stringify(response.data));
      setUserData(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Profile update failed', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="userAccount-body">
      <Navbar />
      <div className="userAccount-profile-section">
        <img src={UserImage} alt={userData.username} className="userAccount-profile-pic" />
        <h2>{userData.username}</h2>
        <p>{userData.email || 'No email provided'}</p>
        <div>
          <strong>Details:</strong>
          <p>Phone: {userData.phone_no}</p>
          <p>Gender: {userData.gender || 'Not specified'}</p>
          <p>Blood Group: {userData.blood_group || 'Not specified'}</p>
          <p>Date of Birth: {userData.date_of_birth || 'Not specified'}</p>
          <p>Role: {userData.role}</p>
        </div>
        <button className="userAccount-change-password" onClick={() => setIsModalOpen(true)}>
          Update Profile
        </button>
        <button className="userAccount-change-password" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {isModalOpen && (
        <div className="userAccount-modal">
          <div className="userAccount-modal-content">
            <span className="userAccount-close" onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            <form onSubmit={handleUpdateProfile}>
              <h3>Update Profile</h3>
              <div className="userAccount-form-row">
                <div className="userAccount-form-group">
                  <label>Username</label>
                  <input 
                    type="text" 
                    name="username" 
                    value={userData.username} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="userAccount-form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={userData.email || ''} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="userAccount-form-group">
                  <label>Phone Number</label>
                  <input 
                    type="text" 
                    name="phone_no" 
                    value={userData.phone_no} 
                    onChange={handleInputChange} 
                  />
                </div>
                <div className="userAccount-form-group">
                  <label>Gender</label>
                  <select 
                    name="gender" 
                    value={userData.gender || ''} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
                <div className="userAccount-form-group">
                  <label>Blood Group</label>
                  <select 
                    name="blood_group" 
                    value={userData.blood_group || ''} 
                    onChange={handleInputChange}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="userAccount-form-group">
                  <label>Date of Birth</label>
                  <input 
                    type="date" 
                    name="date_of_birth" 
                    value={userData.date_of_birth || ''} 
                    onChange={handleInputChange} 
                  />
                </div>
              </div>
              <button type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}