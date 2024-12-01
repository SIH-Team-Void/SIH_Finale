import React, { useState } from "react";
import "../css/bedCat.css";
import Navbar from "../userComponents/userNavbar";
import bedImage from "../img/bed.png";
import avaBedImage from "../img/avabed.png";

export default function BedBooking() {
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

  const openBookingModal = () => setBookingModalOpen(true);
  const closeBookingModal = () => setBookingModalOpen(false);

  const openDetailsModal = () => setDetailsModalOpen(true);
  const closeDetailsModal = () => setDetailsModalOpen(false);

  return (
    <div className="bedCat-body">
      <Navbar />
      <div className="bedCat-container">
        <h3 className="bedCat-b3">Select Bed Category for Booking</h3>
        <div className="bedCat-bed-cards">
          {/* Card Components */}
          <div className="bedCat-card">
            <div className="bedCat-top">
              <h2>General</h2>
              <span>₹ 3,500/day</span>
            </div>
            <div className="bedCat-middle">
              <img src={bedImage} alt="General Bed" />
              <div className="bedCat-beds">
                <div className="bedCat-avaBed">
                  <span>
                    32 <img src={avaBedImage} alt="Available Bed" /> Available
                  </span>
                </div>
                <div className="bedCat-totalBed">
                  <span>
                    42 <img src={avaBedImage} alt="Total Bed" />
                  </span>
                </div>
              </div>
            </div>
            <div className="bedCat-bottom">
              <div className="bedCat-req">
                <button onClick={openBookingModal}>Request For Booking</button>
              </div>
              <div className="bedCat-details">
                <button onClick={openDetailsModal}>Details</button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        <div
          id="bookingModal"
          className="bedCat-modal"
          style={{ display: isBookingModalOpen ? "block" : "none" }}
        >
          <div className="bedCat-modal-content">
            <span className="bedCat-lightFont">Details</span>
            <span className="bedCat-close" onClick={closeBookingModal}>
              &times;
            </span>
            <form>
              <div className="bedCat-form-row">
                <div className="bedCat-form-group">
                  <label htmlFor="aadhar">Aadhar Number:</label>
                  <input
                    type="text"
                    id="aadhar"
                    name="aadhar"
                    placeholder="xxxx-xxxx-xxxx"
                  />
                </div>
                <div className="bedCat-form-group">
                  <label htmlFor="prescription">
                    Prescription/Admission Note:
                  </label>
                  <input type="file" id="prescription" name="prescription" />
                </div>
                <div className="bedCat-form-group">
                  <label htmlFor="date">Date:</label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    placeholder="xx/xx/2xx0"
                  />
                </div>
              </div>
              <p className="bedCat-lightFont">
                Disclaimer: Please note, we will try our best to accommodate
                your bed request in the class option provided by you. However,
                the bed class is subject to availability, and the above form
                does not confirm the booking of the bed.
              </p>
              <p className="bedCat-boldFont">
                By agreeing to submit the above form, you agree to have read and
                understood the Important Notifications & Disclaimers listed
                above.
              </p>
              <div className="bedCat-form-group">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>

        {/* Details Modal */}
        <div
          id="detailsModal"
          className="bedCat-modal"
          style={{ display: isDetailsModalOpen ? "block" : "none" }}
        >
          <div className="bedCat-modal-content">
            <span className="bedCat-close" onClick={closeDetailsModal}>
              &times;
            </span>
            <div className="bedCat-details-content">
              <h2>General Bed Details</h2>
              <p>
                General beds are available at ₹3,500/day. These beds offer basic
                medical facilities and are suitable for general care and
                observation.
              </p>
              <ul>
                <li>Available Beds: 32</li>
                <li>Total Beds: 42</li>
                <li>
                  Facilities: Basic monitoring, Oxygen supply, General care.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
