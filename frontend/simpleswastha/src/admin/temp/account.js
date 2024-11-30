import React from 'react'
import Navbar from '../component/navbar';
import '../css/account.css';
import UserImage from '../img/elon.png';

export default function account() {
  return (
        <div className="account-body">
        <Navbar />
        <div className="account-profile-section">
                <img src={UserImage} alt="Elon Chacha" className="account-profile-pic"/>
                <h2>Elon Chacha</h2>
                <p>elon415@gmail.com</p>
                <p><strong>Address:</strong><br/>Uske ghar ka addres usko pataa. Uske ghar ka addres usko pataa Uske ghar ka addres usko pataa</p>
                <p><strong>Phone no:</strong><br/>+91 8801838989</p>
                <button className="account-change-password">Change Password</button>
        </div>
        </div>
  )
}
