import React from 'react'
import Navbar from '../userComponents/userNavbar';
import '../css/userAccount.css';
import UserImage from '../img/elon.png';

export default function userAccount() {
  return (
        <div className="userAccount-body">
        <Navbar />
        <div className="userAccount-profile-section">
                <img src={UserImage} alt="Elon Chacha" className="userAccount-profile-pic"/>
                <h2>Elon Chacha</h2>
                <p>elon415@gmail.com</p>
                <p><strong>Address:</strong><br/>Uske ghar ka addres usko pataa. Uske ghar ka addres usko pataa Uske ghar ka addres usko pataa</p>
                <p><strong>Phone no:</strong><br/>+91 8801838989</p>
                <button className="userAccount-change-password">Change Password</button>
        </div>
        </div>
  )
}
