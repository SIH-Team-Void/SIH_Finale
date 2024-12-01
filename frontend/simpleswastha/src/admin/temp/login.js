import React from 'react'
import { Link } from 'react-router-dom';
import logoImage from '../img/icon2.png';
import chatbotImage from '../img/chatbot_img.png';
import '../css/login.css';

export default function Login() {
  return (
    <div className="login-body">
      <div className="login-main-container">
        <div className="login-left-container">
        <img src={logoImage} alt="logo" />
          <div className="login-tabs">
            <div className="login-tab1">BED AVAILABILITY</div>
            <div className="login-tab2">OPD APPOINTMENTS</div>
            <div className="login-tab3">MEDICINES</div>
          </div>
          <p className="login-tagline">
            <b>Hospital Registration</b>
          </p>
          <button>
            <img src={chatbotImage} alt="chatbot_img" />
            <div className="login-chatbot"> AI CHAT-BOT ASSISTANCE </div>
          </button>
        </div>
        <div className="login-right-container">
          <p className="login-line1">
            <b>Start with Your Hospital Registration</b>
          </p>
          <Link to="/admin/register">
            <button className="login-RegBut">REGISTER YOUR HOSPITAL</button>
          </Link>
          <p>For Existing User</p>
          <form action="" method="">
            <div className="login-forminputs" id="formContent">
              <div className="login-form-group">
                <label for="hosp_id">Enter your Hospital ID</label>
                <input type="text" id="hosp_id" name="hosp_id" placeholder="Enter UHID" required />
              </div>
              <div className="login-form-group">
                <label for="hosp_email">Enter your Hospital Email ID</label>
                <input type="text" id="hosp_email" name="hosp_email" placeholder="Enter Email ID" required />
              </div>
              <div className="login-form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="*** **** ****" required />
              </div>
              <Link to="/admin/home">
                <button type="submit" className="login-register-btn" id="submitButton">Submit</button>
              </Link>
            </div>
          </form>
        </div>
        <div className="login-help">
          <button>NEED HELP?</button>
        </div>
      </div>
    </div>
  );
}
