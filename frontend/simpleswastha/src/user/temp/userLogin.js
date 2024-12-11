import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/userLogin.css";
import logoImage from '../img/icon2.png';
import chatbotImage from '../img/chatbot_img.png';

export default function UserLogin() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and registration
  const [showChatbot, setShowChatbot] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone_no: '',
    role: 'patient',
  });

  const handleChatbotToggle = () => setShowChatbot(!showChatbot);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? 'http://localhost:8000/api/users/login/'
      : 'http://localhost:8000/api/users/register/';

    // For login, send phone_no and password
    const loginData = isLogin
      ? { phone_no: formData.phone_no, password: formData.password }
      : formData;

    console.log("Form Data:", loginData);  // Debugging: Log the data being sent

    try {
      console.log(`Sending request to: ${endpoint}`);  // Debugging: Log the endpoint being hit
      const response = await axios.post(endpoint, loginData);
      console.log("Response Data:", response.data);  // Debugging: Log the response from the server

      console.log(`${isLogin ? 'User logged in' : 'User registered'}:`, response.data);

      if (isLogin) {
        const userData = response.data;
        console.log(userData)
        
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(localStorage);
        localStorage.setItem('userMobile', formData.phone_no);
        navigate('/user/Home');
      } else {
        // Handle registration success
        alert('Registration successful! Please log in.');
        setIsLogin(true); // Switch to login view
      }
    } catch (error) {
      // Debugging: Log the error details
      console.error(`${isLogin ? 'Login' : 'Registration'} error:`, error.response?.data || error.message);

      if (error.response) {
        console.error("Error Response Data:", error.response.data);  // Log full error response
      }
      
      alert(`${isLogin ? 'Login' : 'Registration'} failed. Please try again.`);
    }
  };

  return (
    <div className="userLog-body">
      <div className="userLog-main-container">
        <div className="userLog-left-container">
          <img src={logoImage} alt="logo" />
          <div className="userLog-tabs">
            <div className="userLog-tab1">BED AVAILABILITY</div>
            <div className="userLog-tab2">OPD APPOINTMENTS</div>
            <div className="userLog-tab3">MEDICINES</div>
          </div>
          <p className="userLog-tagline">
            A one stop solution for all your <b>Health Related</b> Problems.
          </p>
          <p>आप सभी के लिए एक वन स्टॉप समाधान <b>स्वास्थ्य संबंधित</b> समस्याएँ</p>
          <button onClick={handleChatbotToggle}>
            <img src={chatbotImage} alt="chatbot_img" />
            <div className="userLog-chatbot">AI CHAT-BOT ASSISTANCE</div>
          </button>
        </div>
        <div className="userLog-right-container">
          <div className="userLog-options">
            <button
              className={`userLog-activity ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Log In
            </button>
            <button
              className={`userLog-activity ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          <div className="userLog-form-container">
            <form onSubmit={handleFormSubmit}>
              {!isLogin && (
                <div className="userLog-form-group">
                  <label htmlFor="username">USERNAME</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Eg. Ashwin"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}
              <div className="userLog-form-group">
                <label htmlFor="phone_no">Mobile No.</label>
                <input
                  type="tel"
                  id="phone_no"
                  name="phone_no"
                  placeholder="Eg. 123 xxx xxxx"
                  value={formData.phone_no}
                  onChange={handleInputChange}
                  required
                />
              </div>
              {!isLogin && (
                <div className="userLog-form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Eg. abc123@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="userLog-form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="*** ***** ***"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button className="userLog-register-btn" type="submit">
                {isLogin ? 'LOGIN' : 'REGISTER'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
