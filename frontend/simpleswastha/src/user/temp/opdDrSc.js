import React, { useState } from "react";
import "../css/opdDrSc.css";
import Navbar from "../userComponents/userNavbar";
import femaleDr1Img from "../img/femaleDr1.png";
import leftArrow from "../img/left_arr.png";
import rightArrow from "../img/right_arr.png";
import calendarIcon from "../img/cal.png";

export default function OpdDrSc() {
  const [selectedDate, setSelectedDate] = useState("06 Dec");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const generateDates = (start) => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const dayName = date.toLocaleDateString("en-GB", { weekday: "short" }); // e.g., Mon
      const formattedDate = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short", // e.g., Dec
      });
      dates.push({ day: dayName, date: formattedDate });
    }
    return dates;
  };

  const dateList = generateDates(startDate);

  const handleDateClick = (date) => {
    setSelectedDate(date.date);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleScrollLeft = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - 1);
    setStartDate(newStartDate);
  };

  const handleScrollRight = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + 1);
    setStartDate(newStartDate);
  };

  const handleCalendarChange = (date) => {
    setStartDate(date);
    setSelectedDate(
      date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    );
    setShowCalendar(false);
  };

  return (
    <div className="opdDrSc-body">
      <Navbar />
      <section>
        <b className="opdDrSc-titles">OPD Appointment Booking</b>
        <div className="opdDrSc-Dr-list">
          <div className="opdDrSc-Dr-card">
            <img src={femaleDr1Img} alt="Dr Depa Jain" />
            <div className="opdDrSc-Dr-div">
              <div className="opdDrSc-Dr-info">
                <h3>Aastha Kataria</h3>
                <p>MBBS</p>
              </div>
              <div className="opdDrSc-Dr-details">
                <div className="opdDrSc-Dr-cost">
                  <div className="opdDrSc-Dr-fee">
                    <h3>₹ 400</h3>
                    <span>Doctors Fees</span>
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
                className={`date ${
                  selectedDate === dateObj.date ? "selected" : ""
                }`}
                onClick={() => handleDateClick(dateObj)}
              >
                <div className="day">{dateObj.day}</div>
                <div className="date-text">{dateObj.date}</div>
              </div>
            ))}
          </div>
          <button onClick={handleScrollRight} className="arrow-btn">
            <img src={rightArrow} alt="Next" className="arrow" />
          </button>
          <img
            src={calendarIcon}
            alt="Calendar"
            className="calendar"
            onClick={() => setShowCalendar(!showCalendar)}
          />
        </div>

        {showCalendar && (
          <div className="calendar-popup">
            <input
              type="date"
              onChange={(e) => handleCalendarChange(new Date(e.target.value))}
            />
          </div>
        )}

        <div className="container">
          <h1>Time Slots</h1>
          <div className="time-slots">
            {[ 
              "9:30 AM",
              "9:45 AM",
              "10:00 AM",
              "10:15 AM",
              "10:30 AM",
              "10:45 AM",
              "11:00 AM",
              "11:15 AM",
              "11:30 AM",
              "11:45 AM",
              "12:00 AM",
              "12:15 AM",
            ].map((time, index) => (
              <div
                key={time}
                className={`time-slot ${selectedSlot === time ? "selected" : ""} ${
                  index % 2 === 0 ? "green" : "red"
                }`}
                onClick={() => handleSlotClick(time)}
              >
                {time}
              </div>
            ))}
          </div>
          <button className="book-button">BOOK</button>
        </div>
      </section>
    </div>
  );
}
