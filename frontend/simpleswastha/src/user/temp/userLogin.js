import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/userLogin.css";
import logo from '../img/icon2.png';
import chatbotImg from '../img/chatbot_img.png';
import backgroundImg from '../img/background_img.png';

const Login = () => {
  const navigate = useNavigate();
  const chatbotRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('login');
  const [showChatbot, setShowChatbot] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const [formData, setFormData] = useState({
    name: '',
    phone_no: '',
    email: '',
    password: ''
  });

  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  // Handle input changes and log each change for debugging
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Input Change: ${name} = ${value}`);  // Debugging statement
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const endpoint = activeTab === 'signup' 
      ? 'http://localhost:8000/api/users/register/' 
      : 'http://localhost:8000/api/users/login/';
  
    try {
      const response = await axios.post(endpoint, {
        phone_no: formData.phone_no,
        password: formData.password,
        ...(activeTab === 'signup' && { 
          name: formData.name,
          email: formData.email
        })
      });

      console.log('Response data:', response.data);
    
  
      if (activeTab === 'login') {
        localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('phone_no', response.data.phone_no);
        localStorage.setItem('email', response.data.email);
  
        // Log user details to the console (for debugging purposes)
        console.log('User logged in:', {
          username: response.data.username,
          phone_no: response.data.phone_no,
          email: response.data.email
        });
  
        // Navigate to Home page
        navigate('/user/Home');
      } else {
        alert('Registration successful! Please login.');
        setActiveTab('login');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      alert(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };  
  
  const handleChatbotToggle = () => {
    console.log('Chatbot toggle clicked');  // Debugging statement
    setShowChatbot(!showChatbot);
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    console.log('User input submitted to chatbot:', userInput);  // Debugging statement
    const userMessage = { role: "user", content: userInput };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:8000/chat', { content: userInput });
      console.log('Chatbot response:', response.data);  // Debugging statement
      
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

    console.log('Chatbot drag started');  // Debugging statement
  };

  const handleDrag = (e) => {
    if (!isDragging) return;
    chatbotRef.current.style.left = `${e.clientX - dragOffset.x}px`;
    chatbotRef.current.style.top = `${e.clientY - dragOffset.y}px`;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    console.log('Chatbot drag ended');  // Debugging statement
  };

  return (
    <div className="main-container" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="left-container">
        <img src={logo} alt="logo" />
        <div className="tabs">
          <div className="tab1">BED AVAILABILITY</div>
          <div className="tab2">OPD APPOINTMENTS</div>
          <div className="tab3">MEDICINES</div>
        </div>
        <p className="tagline">A one stop solution for all your <b>Health Related</b> Problems.</p>
        <p>आप सभी के लिए एक वन स्टॉप समाधान <b>स्वास्थ्य संबंधित</b> समस्याएँ</p>
        <button onClick={handleChatbotToggle}>
          <img src={chatbotImg} alt="chatbot_img" /> 
          <div className="chatbot">AI CHAT-BOT ASSISTANCE</div>
        </button>
      </div>
      <div className="right-container">
        {activeTab === 'signup' && <p id="reg-log"><b>REGISTER</b> TO GET STARTED</p>}
        {activeTab === 'login' && <p id="reg-log"><b>Login</b> TO GET STARTED</p>}
        
        <div className="form-container">
          <div className="options">
            <button 
              className={`activity ${activeTab === 'login' ? 'active' : ''}`} 
              onClick={() => setActiveTab('login')}
            >
              Log In
            </button>
            <button 
              className={`activity ${activeTab === 'signup' ? 'active' : ''}`} 
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>
          
          <div className="forminputs">
            <form onSubmit={handleSubmit} method="POST">
              {activeTab === 'signup' && (
                <div className="form-group">
                  <label htmlFor="name">NAME</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Eg. Ashwin"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="phone_no">Phone No.</label>
                <input 
                  type="text" 
                  id="phone_no" 
                  name="phone_no" 
                  placeholder="Eg. 123 xxx xxxx" 
                  required
                  value={formData.phone_no}
                  onChange={handleInputChange}
                />
              </div>
              {activeTab === 'signup' && (
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Eg. abc123@gmail.com" 
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <button className="register-btn" type="submit">
                {activeTab === 'signup' ? 'REGISTER' : 'LOGIN'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="help">
        <button>NEED HELP?</button>
      </div>

      {/* Chatbot Modal */}
      {showChatbot && (
        <div 
          ref={chatbotRef}
          className="chatbot-modal"
          style={{ position: 'fixed' }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div className="chatbot-header">
            <span>AI Chatbot</span>
            <button className="botClose" onClick={handleChatbotToggle}>X</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`${msg.role}-message`}
              >
                {msg.content}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input 
              type="text"
              className="botInput"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button 
              className="botSent"
              onClick={handleUserInput}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
