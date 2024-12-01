import React from 'react'
import "../css/userLogin.css"
import { Link } from 'react-router-dom';
import logoImage from '../img/icon2.png';
import chatbotImage from '../img/chatbot_img.png';

export default function userLogin() {
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
        <p className="userLog-tagline">A one stop solution for all your <b> Health Related </b> Problems.</p>
        <p>आप सभी के लिए एक वन स्टॉप समाधान <b> स्वास्थ्य संबंधित </b> समस्याएँ</p>
        <button> <img src={chatbotImage} alt="chatbot_img" /> <div className="userLog-chatbot"> AI CHAT-BOT ASSISTANCE  </div></button>
    </div>
    <div className="userLog-right-container">
        <p id="reg-log"><b>REGISTER</b> TO GET STARTED</p>
        <div className="userLog-form-container">
            <div className="userLog-options">
                <button className="userLog-activity active" id="loginTab">Log In</button>
            </div>
            <div className="userLog-forminputs" id="formContent">
                <form action="../../Back-end/Login.php" method="POST">
                    <div className="userLog-form-group">
                        <label for="name">NAME</label>
                        <input type="text" id="name" name="name" placeholder="Eg. Ashwin" />
                    </div>
                    <div className="userLog-form-group">
                        <label for="mobile">Mobile No.</label>
                        <input type="text" id="mobile" name="mobileNo" placeholder="Eg. 123 xxx xxxx" />
                    </div>
                    <div className="userLog-form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Eg. abc123@gmail.com" />
                    </div>
                    <div className="userLog-form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" name="pass" placeholder="*** ***** ***"  />
                    </div>
                    <Link to="/user/Home">
                    <button className="userLog-register-btn" id="submitButton" type="submit">REGISTER</button>
                    </Link>
                </form>
            </div>
        </div>
    </div>

    <div className="userLog-help">
        <button>NEED HELP?</button>
    </div>
</div>
    </div>
  )
}
