import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/opdDrSc.css";
import Navbar from "../userComponents/userNavbar";
import femaleDr1Img from "../img/femaleDr1.png";
import leftArrow from "../img/left_arr.png";
import rightArrow from "../img/right_arr.png";

export default function OpdDrSc() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState([]);
  
  useEffect(() => {
    const doctorData = JSON.parse(sessionStorage.getItem("selectedDoctor"));
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

  const dateList = generateDates(startDate);

  const handleDateClick = (dateObj) => {
    console.log("Date clicked:", dateObj.date);
    setSelectedDate(dateObj.fullDate);
    fetchAvailableSlots(doctor.doctor_id, dateObj.fullDate);  // Trigger the fetch directly here
  };

  const handleSlotClick = (slot) => {
    if (slot.is_booked) {
      alert("This slot is already booked.");
      return;
    }
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

  const verifyBookingStatus = async (bookingId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/verify-booking-status/${bookingId}/`);
      if (response.ok) {
        const data = await response.json();
        setBookingStatus(prev => ({
          ...prev,
          [bookingId]: data
        }));
        
        // Update available slots if booking status changed
        if (data.is_booked) {
          setAvailableSlots(prevSlots =>
            prevSlots.map(slot =>
              slot.booking_id === bookingId
                ? { ...slot, is_booked: true }
                : slot
            )
          );
        }
      }
    } catch (error) {
      console.error('Error verifying booking status:', error);
    }
  };

  // Modify fetchAvailableSlots to also fetch booking status
  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .split('T')[0];

      const response = await fetch(`http://localhost:8000/api/bookings/?doctor_id=${doctorId}&date=${localDate}`);

      if (response.ok) {
        const data = await response.json();
        const slots = Array.isArray(data) ? data : [];
        setAvailableSlots(slots);

        // Fetch status for all slots
        slots.forEach(slot => {
          verifyBookingStatus(slot.booking_id);
        });
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
      setAvailableSlots([]);
    }
  };

  // Add refund functionality
  const handleRefund = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment and request a refund?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/refund-payment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: bookingId,
        }),
      });

      if (response.ok) {
        alert('Refund processed successfully');
        // Refresh the slots
        fetchAvailableSlots(doctor.doctor_id, selectedDate);
      } else {
        const data = await response.json();
        alert(`Refund failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error processing refund:', error);
      alert('Failed to process refund. Please try again.');
    }
  };

  // Update the booking process
  const handleBooking = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    const patientName = localStorage.getItem("username");
    if (!patientName) {
      alert("Please log in or register to book an appointment.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/create-checkout-session/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking_id: selectedSlot.booking_id,
          patient_name: patientName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { checkout_url } = await response.json();
      
      // Update local state to show slot as pending
      setAvailableSlots(prevSlots =>
        prevSlots.map(slot =>
          slot.booking_id === selectedSlot.booking_id
            ? { ...slot, is_booked: true }
            : slot
        )
      );

      // Redirect to Stripe Checkout
      window.location.href = checkout_url;

    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert(error.message || 'Failed to process payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Update the time slots rendering
  const renderTimeSlots = () => (
    <div className="time-slots">
      {availableSlots.map((slot) => {
        const status = bookingStatus[slot.booking_id] || {};
        const isBooked = slot.is_booked || status.is_booked;
        const isRefunded = status.refunded;
        const isCurrentUserBooking = status.patient_name === localStorage.getItem("username");
  
        return (
          <div
            key={slot.booking_id}
            className={`time-slot ${isBooked ? "red" : "green"} ${
              selectedSlot && selectedSlot.booking_id === slot.booking_id ? "selected" : ""
            }`}
            onClick={() => !isBooked && handleSlotClick(slot)}
          >
            <div className="time-slot-info">
              <span>{slot.start_time} - {slot.end_time}</span>
              {isBooked && !isRefunded && isCurrentUserBooking && (
                <button 
                  className="refund-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRefund(slot.booking_id);
                  }}
                >
                  Cancel & Refund
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // Update the return JSX
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
                className={`time-slot ${slot.is_booked ? "red" : "green"} ${
                  selectedSlot && selectedSlot.booking_id === slot.booking_id ? "selected" : ""
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

          <div className="booking-summary">
            {selectedSlot && doctor && (
              <>
                <h3>Booking Summary</h3>
                <p>Doctor: Dr. {doctor.doctor_name}</p>
                <p>Date: {new Date(selectedSlot.date).toLocaleDateString()}</p>
                <p>Time: {selectedSlot.start_time} - {selectedSlot.end_time}</p>
                <p>Fees: ₹{doctor.fees}</p>
              </>
            )}
          </div>

          <div className="book-button-container">
            <button 
              className={`book-button ${loading ? 'loading' : ''}`}
              disabled={!selectedSlot || loading} 
              onClick={handleBooking}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="cancel-page">
      <h1>Payment Cancelled</h1>
      <p>Your appointment booking was not completed.</p>
      <button onClick={() => navigate(-1)}>
        Try Again
      </button>
    </div>
  );
};

export const SuccessPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const bookingId = queryParams.get('booking_id');

    if (bookingId) {
      // You can fetch booking details here if needed
      setLoading(false);
    } else {
      setError('Invalid booking reference');
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="success-page">
      <h1>Payment Successful!</h1>
      <p>Your appointment has been confirmed.</p>
      <button onClick={() => navigate('/user/home')}>
        View My Appointments
      </button>
    </div>
  );
};