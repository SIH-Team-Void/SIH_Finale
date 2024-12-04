import React, { useState, useRef } from 'react';
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

  const chatbotRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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
<<<<<<< HEAD
      const response = await axios.post('http://localhost:8000/api/users/register', formData);
      console.log('User registered:', response.data);
      navigate('/user/Home');
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      if (error.response && error.response.data) {
        alert(`Registration failed: ${error.response.data.message || JSON.stringify(error.response.data)}`);
=======
      console.log(`Sending request to: ${endpoint}`);  // Debugging: Log the endpoint being hit
      const response = await axios.post(endpoint, loginData);
      console.log("Response Data:", response.data);  // Debugging: Log the response from the server

      console.log(`${isLogin ? 'User logged in' : 'User registered'}:`, response.data);

      if (isLogin) {
        const userData = response.data;
        console.log(userData)
        
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log(localStorage);
        navigate('/user/Home');
>>>>>>> 4432a3e48e67bba4c4897a3c6ef75357a8e27ca5
      } else {
        // Handle registration success
        alert('Registration successful! Please log in.');
        setIsLogin(true); // Switch to login view
      }
<<<<<<< HEAD
    }
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    const userMessage = { role: "user", content: userInput };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:8000/chat', { content: userInput });
      const botMessage = {
        role: "bot",
        content: response.data.response || "Sorry, I couldn't understand that. Can you rephrase?"
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      const errorMessage = {
        role: "bot",
        content: "Sorry, there was an issue connecting to the chatbot. Please try again later."
      };
      setMessages((prev) => [...prev, errorMessage]);
=======
    } catch (error) {
      // Debugging: Log the error details
      console.error(`${isLogin ? 'Login' : 'Registration'} error:`, error.response?.data || error.message);

      if (error.response) {
        console.error("Error Response Data:", error.response.data);  // Log full error response
      }
      
      alert(`${isLogin ? 'Login' : 'Registration'} failed. Please try again.`);
>>>>>>> 4432a3e48e67bba4c4897a3c6ef75357a8e27ca5
    }

    setUserInput("");
  };

  // Dragging logic for the chatbot modal
  const handleDragStart = (e) => {
    setIsDragging(true);
    const rect = chatbotRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    // Preserve size during dragging
    chatbotRef.current.style.width = `${rect.width}px`;
    chatbotRef.current.style.height = `${rect.height}px`;
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    chatbotRef.current.style.left = `${e.clientX - dragOffset.x}px`;
    chatbotRef.current.style.top = `${e.clientY - dragOffset.y}px`;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
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
<<<<<<< HEAD
          <p className="login-line1">
            <b>Start with Your Registration</b>
          </p>
          <Link to="/user/signup">
            <button className="userLog-RegBut">Create Account</button>
          </Link>
          <p>For Existing User</p>
=======
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
>>>>>>> 4432a3e48e67bba4c4897a3c6ef75357a8e27ca5
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
<<<<<<< HEAD
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
        <div
          className="chatbot-modal"
          ref={chatbotRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          style={{ position: "absolute", top: "10%", left: "10%" , height: "62%" }}
        >
          <div className="chatbot-header">
            <h3>Simple Swastha AI Chatbot</h3>
            <button onClick={handleChatbotToggle} className='botClose'>X</button>
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
              className='botInput'
            />
            <button onClick={handleUserInput} className='botSent'>Send</button>
          </div>
        </div>
      )}
=======
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
>>>>>>> 4432a3e48e67bba4c4897a3c6ef75357a8e27ca5
    </div>
  );
}
