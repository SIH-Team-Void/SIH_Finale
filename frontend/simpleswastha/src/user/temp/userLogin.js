import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/userLogin.css";
import logoImage from '../img/icon2.png';
import chatbotImage from '../img/chatbot_img.png';

export default function UserLogin() {
  const navigate = useNavigate();
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone_no: '',
    gender: null,
    blood_group: null,
    date_of_birth: null,
    role: 'patient'
  });

  const handleChatbotToggle = () => setShowChatbot(!showChatbot);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/users/register', formData);
  
      // Assuming the backend returns a token or user info
      console.log('User registered:', response.data);
  
      // Navigate to the home page after successful registration
      navigate('/user/Home');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        alert(`Registration failed: ${error.response.data.message || JSON.stringify(error.response.data)}`);
      } else {
        alert('Registration failed. Please try again later.');
      }
    }
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      const botMessage = { role: "bot", content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      const errorMessage = {
        role: "bot",
        content: "Sorry, I couldn't connect to the server. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setUserInput("");
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
          <p id="reg-log"><b>REGISTER</b> TO GET STARTED</p>
          <div className="userLog-form-container">
            <div className="userLog-options">
              <button className="userLog-activity active" id="loginTab">Log In</button>
            </div>
            <div className="userLog-forminputs" id="formContent">
              <form onSubmit={handleUserRegistration}>
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
                {/* <div className="userLog-form-group">
                  <label htmlFor="date_of_birth">Date of Birth</label>
                  <input 
                    type="date" 
                    id="date_of_birth" 
                    name="date_of_birth" 
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    required 
                  />
                </div> */}
                <button 
                  className="userLog-register-btn" 
                  id="submitButton" 
                  type="submit"
                >
                  REGISTER
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {showChatbot && (
        <div className="chatbot-modal">
          <div className="chatbot-header">
            <h3>Simple Swastha AI Chatbot</h3>
            <button onClick={handleChatbotToggle}>Close</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.role === "user" ? "user-message" : "bot-message"}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your symptoms here..."
            />
            <button onClick={handleUserInput}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}