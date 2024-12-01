import React from "react";
import searchIcon from "../img/search.png";
import femaleDr1Img from "../img/femaleDr1.png";
import femaleDr2Img from "../img/femaleDr2.png";
import femaleDr3Img from "../img/femaleDr3.png";
import maleDr1Img from "../img/maleDr1.png";
import maleDr2Img from "../img/maleDr2.png";
import "../css/opdDr.css";
import { Link } from 'react-router-dom';
import Navbar from '../userComponents/userNavbar';

export default function OpdDr() {
  return (
    <div className="opdDr-body">
        <Navbar />
      <section>
        <div className="opdDr-drSection">
          <div className="opdDr-search">
            <img src={searchIcon} alt="search" />
            <div className="opdDr-search-bar">
              <input type="text" placeholder="Search By Hospital's Name" />
            </div>
          </div>
          <div className="opdDr-Dr-list">
            <div className="opdDr-Dr-card">
              <img src={femaleDr1Img} alt="Dr Depa Jain" />
              <div className="opdDr-Dr-div">
                <div className="opdDr-Dr-info">
                  <h3>Aastha Kataria</h3>
                  <p>MBBS</p>
                </div>
                <div className="opdDr-Dr-details">
                  <div className="opdDr-Dr-cost">
                    <div className="opdDr-Dr-fee">
                      <h3>₹ 400</h3>
                      <span>Doctors Fees</span>
                    </div>
                    <div className="opdDr-booking-fee">
                      <h3>₹ 100</h3>
                      <span>Booking Fees</span>
                    </div>
                  </div>
                  <Link to="/user/opdDrSc" className="opdDr-btn">
                    View Doctors Schedule
                  </Link>
                </div>
              </div>
            </div>
            <div className="opdDr-Dr-card">
              <img src={femaleDr3Img} alt="Dr Tanistha Ghosh" />
              <div className="opdDr-Dr-div">
                <div className="opdDr-Dr-info">
                  <h3>Kaveri Chawhan</h3>
                  <p>MD</p>
                </div>
                <div className="opdDr-Dr-details">
                  <div className="opdDr-Dr-cost">
                    <div className="opdDr-Dr-fee">
                      <h3>₹ 1,000</h3>
                      <span>Doctors Fees</span>
                    </div>
                    <div className="opdDr-booking-fee">
                      <h3>₹ 100</h3>
                      <span>Booking Fees</span>
                    </div>
                  </div>
                  <a href="OPDdrSc.php" className="opdDr-btn">
                    View Doctors Schedule
                  </a>
                </div>
              </div>
            </div>
            <div className="opdDr-Dr-card">
              <img src={maleDr1Img} alt="Dr Ashwin Prajapati" />
              <div className="opdDr-Dr-div">
                <div className="opdDr-Dr-info">
                  <h3>Ashwin Prajapati</h3>
                  <p>B.Ms</p>
                </div>
                <div className="opdDr-Dr-details">
                  <div className="opdDr-Dr-cost">
                    <div className="opdDr-Dr-fee">
                      <h3>₹ 800</h3>
                      <span>Doctors Fees</span>
                    </div>
                    <div className="opdDr-booking-fee">
                      <h3>₹ 100</h3>
                      <span>Booking Fees</span>
                    </div>
                  </div>
                  <a href="OPDdrSc.php" className="opdDr-btn">
                    View Doctors Schedule
                  </a>
                </div>
              </div>
            </div>
            <div className="opdDr-Dr-card">
              <img src={maleDr2Img} alt="Dr Suyash Mundhe" />
              <div className="opdDr-Dr-div">
                <div className="opdDr-Dr-info">
                  <h3>Suyash Mundhe</h3>
                  <p>MD</p>
                </div>
                <div className="opdDr-Dr-details">
                  <div className="opdDr-Dr-cost">
                    <div className="opdDr-Dr-fee">
                      <h3>₹ 1,400</h3>
                      <span>Doctors Fees</span>
                    </div>
                    <div className="opdDr-booking-fee">
                      <h3>₹ 100</h3>
                      <span>Booking Fees</span>
                    </div>
                  </div>
                  <a href="OPDdrSc.php" className="opdDr-btn">
                    View Doctors Schedule
                  </a>
                </div>
              </div>
            </div>
            <div className="opdDr-Dr-card">
              <img src={femaleDr2Img} alt="Dr Vedika Surve" />
              <div className="opdDr-Dr-div">
                <div className="opdDr-Dr-info">
                  <h3>Vedika Surve</h3>
                  <p>MBBS</p>
                </div>
                <div className="opdDr-Dr-details">
                  <div className="opdDr-Dr-cost">
                    <div className="opdDr-Dr-fee">
                      <h3>₹ 1,200</h3>
                      <span>Doctors Fees</span>
                    </div>
                    <div className="opdDr-booking-fee">
                      <h3>₹ 100</h3>
                      <span>Booking Fees</span>
                    </div>
                  </div>
                  <a href="OPDdrSc.php" className="opdDr-btn">
                    View Doctors Schedule
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
