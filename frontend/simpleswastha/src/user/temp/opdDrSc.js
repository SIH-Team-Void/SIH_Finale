import React, { useState, useEffect } from "react";
import "../css/opdDrSc.css";
import Navbar from "../userComponents/userNavbar";
import femaleDr1Img from "../img/femaleDr1.png";
import leftArrow from "../img/left_arr.png";
import rightArrow from "../img/right_arr.png";

export default function OpdDrSc() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const doctorData = JSON.parse(sessionStorage.getItem("selectedDoctor"));
    console.log("Fetched doctor data from sessionStorage:", doctorData);
    if (doctorData) {
      setDoctor(doctorData);
      fetchAvailableSlots(doctorData.doctor_id, selectedDate);
    }
  }, [selectedDate]);

  function getFormattedDate(date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });
  }

  const generateDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const dayName = date.toLocaleDateString("en-GB", { weekday: "short" });
      const formattedDate = getFormattedDate(date);
      dates.push({ day: dayName, date: formattedDate, fullDate: date });
    }
    return dates;
  };

  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      // Adjust the date to local timezone
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];

      console.log("Fetching slots for doctorId:", doctorId, "and date:", localDate);

      const response = await fetch(`http://localhost:8000/api/bookings/?doctor_id=${doctorId}&date=${localDate}`);
      console.log("API endpoint:", `http://localhost:8000/api/bookings/?doctor_id=${doctorId}&date=${localDate}`);

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Data:", data);
        setAvailableSlots(Array.isArray(data) ? data : []);
      } else {
        console.error("Error: API response not ok");
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    }
  };

  const dateList = generateDates(startDate);

  const handleBooking = async () => {
    const patientName = localStorage.getItem("username"); // Retrieve patient name from local storage
    
    if (!patientName) {
      alert("Patient name is missing. Please log in or register.");
      return;
    }
  
    // Prepare data for the request
    const bookingData = {
      patient_name: patientName,
      is_booked: true,
    };
  
    try {
      // Send PATCH request to update the booking slot with patient details
      console.log(selectedSlot.booking_id);
      const response = await fetch(`http://localhost:8000/api/bookings/${selectedSlot.booking_id}/`, {
        method: "PATCH", // Use PATCH for partial updates; use POST if you are creating a new booking
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
  
      if (response.ok) {
        alert("Slot booked successfully!");
        // Refresh slots after booking to reflect changes in the UI
        fetchAvailableSlots(doctor.doctor_id, selectedDate);
        setSelectedSlot(null); // Reset selected slot
      } else {
        const errorData = await response.json();
        alert(`Failed to book the slot: ${errorData.detail || 'Please try again.'}`);
      }
    } catch (error) {
      console.error("Error booking the slot:", error);
      alert("An error occurred while booking the slot.");
    }
  };
  

  const handleDateClick = (dateObj) => {
    console.log("Date clicked:", dateObj.date);
    setSelectedDate(dateObj.fullDate);
    fetchAvailableSlots(doctor.doctor_id, dateObj.fullDate);  // Trigger the fetch directly here
  };

  const handleSlotClick = (slot) => {
    console.log("Slot selected:", slot);
    setSelectedSlot(slot);
  };

  const handleScrollLeft = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 7);
    setStartDate(newStartDate);
  };

  const handleScrollRight = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 7);
    setStartDate(newStartDate);
  };

  return (
    <div className="opdDrSc-body">
      <Navbar />
      <section>
        <b className="opdDrSc-titles">OPD Appointment Booking</b>
        <div className="opdDrSc-Dr-list">
          <div className="opdDrSc-Dr-card">
            <img src={femaleDr1Img} alt={doctor?.doctor_name || "Doctor"} />
            <div className="opdDrSc-Dr-div">
              <div className="opdDrSc-Dr-info">
                <h3>{doctor?.doctor_name}</h3>
                <p>{doctor?.education}</p>
              </div>
              <div className="opdDrSc-Dr-details">
                <div className="opdDrSc-Dr-cost">
                  <div className="opdDrSc-Dr-fee">
                    <h3>₹ {doctor?.fees}</h3>
                    <span>Doctor's Fees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="date-picker">
          <button onClick={handleScrollLeft} className="arrow-btn">
            <img src={leftArrow} alt="Previous" className="arrow" />
          </button>
          <div className="dates">
            {dateList.map((dateObj) => (
              <div
                key={dateObj.date}
                className={`date ${selectedDate.toDateString() === dateObj.fullDate.toDateString() ? "selected" : ""}`}
                onClick={() => handleDateClick(dateObj)}
              >
                <span>{dateObj.day}</span>
                <p>{dateObj.date}</p>
              </div>
            ))}
          </div>
          <button onClick={handleScrollRight} className="arrow-btn">
            <img src={rightArrow} alt="Next" className="arrow" />
          </button>
        </div>

        <div className="container">
          <h1>Time Slots</h1>
          <div className="time-slots">
          {availableSlots.length > 0 ? (
            availableSlots.map((slot) => (
              <div
                key={slot.booking_id}
                className={`time-slot ${selectedSlot?.booking_id === slot.booking_id ? "selected" : ""} ${
                  slot.is_booked ? "red" : "green"
                }`}
                onClick={() => handleSlotClick(slot)}
              >
                {slot.start_time} - {slot.end_time}
              </div>
            ))
          ) : (
            <p>No available time slots</p>
          )}
          </div>


          {/* Add the BOOK button */}
          <div className="book-button-container">
            <button 
              className="book-button" 
              disabled={!selectedSlot} 
              onClick={handleBooking}
            >
              BOOK
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
