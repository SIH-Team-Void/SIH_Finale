import React, { useState } from 'react';
import "../css/userLogin.css";
import { Link } from 'react-router-dom';
import logoImage from '../img/icon2.png';
import chatbotImage from '../img/chatbot_img.png';

export default function UserLogin() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const handleChatbotToggle = () => setShowChatbot(!showChatbot);

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
        <p className="login-line1">
            <b>Start with Your Registration</b>
          </p>
          <Link to="/user/signup">
            <button className="userLog-RegBut">Create Account</button>
          </Link>
          <p>For Existing User</p>
          <div className="userLog-form-container">
            <div className="userLog-options">
              <button className="userLog-activity active" id="loginTab">Log In</button>
            </div>
            <div className="userLog-forminputs" id="formContent">
              <form action="../../Back-end/Login.php" method="POST">
                <div className="userLog-form-group">
                  <label htmlFor="name">NAME</label>
                  <input type="text" id="name" name="name" placeholder="Eg. Ashwin" />
                </div>
                <div className="userLog-form-group">
                  <label htmlFor="mobile">Mobile No.</label>
                  <input type="text" id="mobile" name="mobileNo" placeholder="Eg. 123 xxx xxxx" />
                </div>
                <div className="userLog-form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Eg. abc123@gmail.com" />
                </div>
                <div className="userLog-form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="pass" placeholder="*** ***** ***" />
                </div>
                <Link to="/user/Home">
                  <button className="userLog-register-btn" id="submitButton" type="submit">REGISTER</button>
                </Link>
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
