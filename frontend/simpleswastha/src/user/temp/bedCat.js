// import React, { useState, useEffect, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import "../css/bedCat.css";
// import Navbar from "../userComponents/userNavbar";
// import bedImage from "../img/bed.png";
// import avaBedImage from "../img/avabed.png";

// export default function BedBooking() {
//   const { hospitalId } = useParams();
//   const [wards, setWards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isBookingModalOpen, setBookingModalOpen] = useState(false);
//   const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
//   const [selectedWard, setSelectedWard] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({ message: '', type: '' });

//   const fetchWards = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:8000/bed_management/ward/list/${hospitalId}/`, {
//         headers: {
//           'Accept': 'application/json',
//           'Authorization': token ? `Bearer ${token}` : ''
//         }
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to fetch wards');
//       }
//       const data = await response.json();
//       setWards(data);
//       setError(null);
//     } catch (err) {
//       setError('Failed to load ward information: ' + err.message);
//       console.error('Error fetching wards:', err);
//     } finally {
//       setLoading(false);
//     }
//   }, [hospitalId]);

//   useEffect(() => {
//     fetchWards();
//   }, [fetchWards]);

//   const openBookingModal = (ward) => {
//     console.log('Opening booking modal with ward:', ward);
//     if (!ward) {
//       console.error('No ward provided to openBookingModal');
//       return;
//     }
//     setSelectedWard(ward);
//     setBookingModalOpen(true);
//     setSubmitStatus({ message: '', type: '' });
//   };

//   const openDetailsModal = (ward) => {
//     setSelectedWard(ward);
//     setDetailsModalOpen(true);
//   };

//   const closeBookingModal = () => {
//     setBookingModalOpen(false);
//     setSelectedWard(null);
//     setSubmitStatus({ message: '', type: '' });
//     setIsSubmitting(false);
//   };

//   const closeDetailsModal = () => {
//     setDetailsModalOpen(false);
//     setSelectedWard(null);
//   };

//   const handleBookingSubmit = async (e) => {
//     e.preventDefault();
    
//     setIsSubmitting(true);
//     setSubmitStatus({ message: '', type: '' });
  
//     try {
//       const formData = new FormData();
      
//       // Append all fields to FormData
//       formData.append('ward', selectedWard.id);
//       formData.append('hospital', hospitalId);
//       formData.append('aadhar_number', e.target.aadhar.value);
//       formData.append('booking_date', e.target.date.value);
//       formData.append('prescription', e.target.prescription.files[0]);
  
//       console.log('Sending form data:', {
//         ward: selectedWard.id,
//         hospital: hospitalId,
//         aadhar_number: e.target.aadhar.value,
//         booking_date: e.target.date.value,
//         prescription: e.target.prescription.files[0]?.name
//       });
  
//       const response = await fetch(`http://localhost:8000/bed_management/bookings/create/${hospitalId}/`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           // Remove Content-Type header to let the browser set it with boundary for FormData
//         },
//         body: formData
//       });
  
//       const data = await response.json();
//       console.log('Response:', data);
  
//       if (!response.ok) {
//         throw new Error(data.message || data.error || 'Failed to submit booking');
//       }
  
//       setSubmitStatus({
//         message: 'Booking request submitted successfully!',
//         type: 'success'
//       });
  
//       setTimeout(() => {
//         closeBookingModal();
//         fetchWards();
//       }, 2000);
  
//     } catch (error) {
//       console.error('Error submitting booking:', error);
//       setSubmitStatus({
//         message: `Booking failed: ${error.message}`,
//         type: 'error'
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const getAvailableBeds = (ward) => {
//     if (!ward?.beds) return 0;
//     return ward.beds.filter(bed => bed.status === 'vacant').length;
//   };

//   if (loading) {
//     return (
//       <div className="bedCat-body">
//         <Navbar />
//         <div className="bedCat-container">
//           <h3>Loading ward information...</h3>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bedCat-body">
//         <Navbar />
//         <div className="bedCat-container">
//           <h3>Error: {error}</h3>
//           <button 
//             onClick={fetchWards}
//             className="bedCat-retry-button"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="bedCat-body">
//       <Navbar />
//       <div className="bedCat-container">
//         <h3 className="bedCat-b3">Select Bed Category for Booking</h3>
//         <div className="bedCat-bed-cards">
//           {wards.map((ward) => (
//             <div key={ward.id} className="bedCat-card">
//               <div className="bedCat-top">
//                 <h2>{ward.ward_name}</h2>
//                 <span>₹ {ward.cost}/day</span>
//               </div>
//               <div className="bedCat-middle">
//                 <img src={bedImage} alt={ward.ward_name} />
//                 <div className="bedCat-beds">
//                   <div className="bedCat-avaBed">
//                     <span>
//                       {getAvailableBeds(ward)} <img src={avaBedImage} alt="Available Bed" /> Available
//                     </span>
//                   </div>
//                   <div className="bedCat-totalBed">
//                     <span>
//                       {ward.no_of_beds} <img src={avaBedImage} alt="Total Bed" />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div className="bedCat-bottom">
//                 <div className="bedCat-req">
//                   <button 
//                     onClick={() => openBookingModal(ward)}
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? 'Processing...' : 'Request For Booking'}
//                   </button>
//                 </div>
//                 <div className="bedCat-details">
//                   <button onClick={() => openDetailsModal(ward)}>Details</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Booking Modal */}
//         <div
//           id="bookingModal"
//           className="bedCat-modal"
//           style={{ display: isBookingModalOpen ? "block" : "none" }}
//         >
//           <div className="bedCat-modal-content">
//             <span className="bedCat-lightFont">Details - {selectedWard?.ward_name}</span>
//             <span className="bedCat-close" onClick={closeBookingModal}>
//               &times;
//             </span>
//             {submitStatus.message && (
//               <div className={`bedCat-status-message ${submitStatus.type}`}>
//                 {submitStatus.message}
//               </div>
//             )}
//             <form onSubmit={handleBookingSubmit}>
//               <div className="bedCat-form-row">
//                 <div className="bedCat-form-group">
//                   <label htmlFor="aadhar">Aadhar Number:</label>
//                   <input
//                     type="text"
//                     id="aadhar"
//                     name="aadhar"
//                     placeholder="xxxx-xxxx-xxxx"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div className="bedCat-form-group">
//                   <label htmlFor="prescription">
//                     Prescription/Admission Note:
//                   </label>
//                   <input 
//                     type="file" 
//                     id="prescription" 
//                     name="prescription" 
//                     accept=".pdf,.jpg,.jpeg,.png"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//                 <div className="bedCat-form-group">
//                   <label htmlFor="date">Date:</label>
//                   <input
//                     type="date"
//                     id="date"
//                     name="date"
//                     disabled={isSubmitting}
//                   />
//                 </div>
//               </div>
//               <p className="bedCat-lightFont">
//                 Disclaimer: Please note, we will try our best to accommodate
//                 your bed request in the class option provided by you. However,
//                 the bed class is subject to availability, and the above form
//                 does not confirm the booking of the bed.
//               </p>
//               <p className="bedCat-boldFont">
//                 By agreeing to submit the above form, you agree to have read and
//                 understood the Important Notifications & Disclaimers listed
//                 above.
//               </p>
//               <div className="bedCat-form-group">
//                 <button 
//                   type="submit" 
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Submit'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Details Modal */}
//         <div
//           id="detailsModal"
//           className="bedCat-modal"
//           style={{ display: isDetailsModalOpen ? "block" : "none" }}
//         >
//           <div className="bedCat-modal-content">
//             <span className="bedCat-close" onClick={closeDetailsModal}>
//               &times;
//             </span>
//             <div className="bedCat-details-content">
//               <h2>{selectedWard?.ward_name} Details</h2>
//               <p>{selectedWard?.ward_details}</p>
//               <ul>
//                 <li>Available Beds: {selectedWard ? getAvailableBeds(selectedWard) : 0}</li>
//                 <li>Total Beds: {selectedWard?.no_of_beds}</li>
//                 <li>Cost per day: ₹{selectedWard?.cost}</li>
//                 <li>Current Status: {selectedWard?.status}</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import "../css/bedCat.css";
// import Navbar from "../userComponents/userNavbar";
// import bedImage from "../img/bed.png";
// import avaBedImage from "../img/avabed.png";

// export default function BedBooking() {
//   const [isBookingModalOpen, setBookingModalOpen] = useState(false);
//   const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);

//   const openBookingModal = () => setBookingModalOpen(true);
//   const closeBookingModal = () => setBookingModalOpen(false);

//   const openDetailsModal = () => setDetailsModalOpen(true);
//   const closeDetailsModal = () => setDetailsModalOpen(false);

//   return (
//     <div className="bedCat-body">
//       <Navbar />
//       <div className="bedCat-container">
//         <h3 className="bedCat-b3">Select Bed Category for Booking</h3>
//         <div className="bedCat-bed-cards">
//           {/* Card Components */}
//           <div className="bedCat-card">
//             <div className="bedCat-top">
//               <h2>General</h2>
//               <span>₹ 3,500/day</span>
//             </div>
//             <div className="bedCat-middle">
//               <img src={bedImage} alt="General Bed" />
//               <div className="bedCat-beds">
//                 <div className="bedCat-avaBed">
//                   <span>
//                     32 <img src={avaBedImage} alt="Available Bed" /> Available
//                   </span>
//                 </div>
//                 <div className="bedCat-totalBed">
//                   <span>
//                     42 <img src={avaBedImage} alt="Total Bed" />
//                   </span>
//                 </div>
//               </div>
//             </div>
//             <div className="bedCat-bottom">
//               <div className="bedCat-req">
//                 <button onClick={openBookingModal}>Request For Booking</button>
//               </div>
//               <div className="bedCat-details">
//                 <button onClick={openDetailsModal}>Details</button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Booking Modal */}
//         <div
//           id="bookingModal"
//           className="bedCat-modal"
//           style={{ display: isBookingModalOpen ? "block" : "none" }}
//         >
//           <div className="bedCat-modal-content">
//             <span className="bedCat-lightFont">Details</span>
//             <span className="bedCat-close" onClick={closeBookingModal}>
//               &times;
//             </span>
//             <form>
//               <div className="bedCat-form-row">
//                 <div className="bedCat-form-group">
//                   <label htmlFor="aadhar">Aadhar Number:</label>
//                   <input
//                     type="text"
//                     id="aadhar"
//                     name="aadhar"
//                     placeholder="xxxx-xxxx-xxxx"
//                   />
//                 </div>
//                 <div className="bedCat-form-group">
//                   <label htmlFor="prescription">
//                     Prescription/Admission Note:
//                   </label>
//                   <input type="file" id="prescription" name="prescription" />
//                 </div>
//                 <div className="bedCat-form-group">
//                   <label htmlFor="date">Date:</label>
//                   <input
//                     type="text"
//                     id="date"
//                     name="date"
//                     placeholder="xx/xx/2xx0"
//                   />
//                 </div>
//               </div>
//               <p className="bedCat-lightFont">
//                 Disclaimer: Please note, we will try our best to accommodate
//                 your bed request in the class option provided by you. However,
//                 the bed class is subject to availability, and the above form
//                 does not confirm the booking of the bed.
//               </p>
//               <p className="bedCat-boldFont">
//                 By agreeing to submit the above form, you agree to have read and
//                 understood the Important Notifications & Disclaimers listed
//                 above.
//               </p>
//               <div className="bedCat-form-group">
//                 <button type="submit">Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>

//         {/* Details Modal */}
//         <div
//           id="detailsModal"
//           className="bedCat-modal"
//           style={{ display: isDetailsModalOpen ? "block" : "none" }}
//         >
//           <div className="bedCat-modal-content">
//             <span className="bedCat-close" onClick={closeDetailsModal}>
//               &times;
//             </span>
//             <div className="bedCat-details-content">
//               <h2>General Bed Details</h2>
//               <p>
//                 General beds are available at ₹3,500/day. These beds offer basic
//                 medical facilities and are suitable for general care and
//                 observation.
//               </p>
//               <ul>
//                 <li>Available Beds: 32</li>
//                 <li>Total Beds: 42</li>
//                 <li>
//                   Facilities: Basic monitoring, Oxygen supply, General care.
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../userComponents/userNavbar';
import "../css/bedCat.css";
import bedImage from "../img/bed.png";
import avaBedImage from "../img/avabed.png";

const BACKEND_URL = 'http://localhost:8000';

const WardCard = ({ ward, onBookingClick, onDetailsClick }) => {
  console.log('Ward in WardCard:', ward);
  return (
    <div className="bedCat-card">
      <div className="bedCat-top">
        <h2>{ward.ward_name}</h2>
        <span>₹ {ward.cost}/day</span>
      </div>
      
      <div className="bedCat-middle">
        <img 
          src={bedImage}
          alt={ward.ward_name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        <div className="bedCat-beds">
          <img 
            src={ward.no_of_beds > 0 ? avaBedImage : bedImage}
            alt={ward.no_of_beds > 0 ? "Available Bed" : "Bed"}
          />
          <div className="bedCat-avaBed">
            <span>
              {ward.no_of_beds} Available
            </span>
          </div>
        </div>
      </div>

      <div className="bedCat-bottom">
        <div className="bedCat-req">
          <button 
            onClick={onBookingClick}
            disabled={ward.no_of_beds === 0}
          >
            {ward.no_of_beds === 0 ? 'No Beds Available' : 'Request For Booking'}
          </button>
        </div>
        <div className="bedCat-details">
          <button onClick={onDetailsClick}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

const BedBooking = () => {
  const { hospitalId } = useParams();
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isDetailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedWard, setSelectedWard] = useState(null);
  const [hospital, setHospital] = useState(null);

  useEffect(() => {
    const fetchHospitalAndWards = async () => {
      try {
          setLoading(true);
          const hospListResponse = await fetch(`${BACKEND_URL}/api/hospital/register/`);
          if (!hospListResponse.ok) throw new Error('Failed to fetch hospital list');
          const hospList = await hospListResponse.json();
          const currentHospital = hospList.find(h => h.hosp_ID === parseInt(hospitalId));
          if (!currentHospital) throw new Error('Hospital not found');
          setHospital(currentHospital);

        const wardsResponse = await fetch(`${BACKEND_URL}/bed_management/ward/list/${hospitalId}/`);
        if (!wardsResponse.ok) throw new Error('Failed to fetch ward data');
        const wardsData = await wardsResponse.json();
        setWards(wardsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHospitalAndWards();
  }, [hospitalId]);


//   
const handleBookingSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  
  try {
      if (!selectedWard || !selectedWard.ward) {
          throw new Error('Please select a ward first');
      }

      // Create FormData object
      const bookingFormData = new FormData();
      bookingFormData.append('aadhar_number', formData.get('aadhar'));
      bookingFormData.append('booking_date', formData.get('date'));
      bookingFormData.append('ward', selectedWard.ward);
      bookingFormData.append('hospital', hospitalId);
      
      // Get the file object
      const prescriptionFile = formData.get('prescription');
      if (prescriptionFile && prescriptionFile.size > 0) {
          bookingFormData.append('prescription', prescriptionFile, prescriptionFile.name);
      } else {
          bookingFormData.append('prescription', null); // Explicitly set to null if no file
      }

      console.log('Submitting booking with data:', {
          aadhar_number: formData.get('aadhar'),
          booking_date: formData.get('date'),
          ward: selectedWard.ward,
          hospital: hospitalId,
          prescription: prescriptionFile ? prescriptionFile.name : null
      });

      const response = await fetch(`${BACKEND_URL}/bed_management/bookings/create/${hospitalId}/`, {
          method: 'POST',
          body: bookingFormData // Don't set Content-Type - let browser handle it
      });

      // Get response as text first to check for errors
      const responseText = await response.text();
      let responseData;
      
      try {
          responseData = JSON.parse(responseText);
      } catch (e) {
          console.error('Failed to parse response:', responseText);
          throw new Error('Invalid response from server');
      }

      if (!response.ok) {
          throw new Error(responseData.error || 'Failed to submit booking');
      }

      setBookingModalOpen(false);
      alert(`Booking request submitted successfully!\n
          Booking ID: ${responseData.book_id}\n
          Aadhar: ${responseData.aadhar_number}\n
          Date: ${responseData.booking_date}\n
          Status: ${responseData.status}`);
          
      // Refresh ward list
      const wardsResponse = await fetch(`${BACKEND_URL}/bed_management/ward/list/${hospitalId}/`);
      if (wardsResponse.ok) {
          const wardsData = await wardsResponse.json();
          setWards(wardsData);
      }
      
      setSelectedWard(null);
      
  } catch (err) {
      console.error('Booking error:', err);
      alert('Failed to submit booking: ' + err.message);
  }
};


  if (loading) return <div className="bedCat-body"><Navbar /><div className="loading">Loading...</div></div>;
  if (error) return <div className="bedCat-body"><Navbar /><div className="error">{error}</div></div>;

  return (
    <div className="bedCat-body">
      <Navbar />
      <div className="bedCat-container">
        {/* {hospital && (
          // <div className="bedCat-hospital-info">
          //   <h2>{hospital.hosp_name}</h2>
          //   <p>{hospital.hosp_address}</p>
          // </div>
        )} */}
        
        <h3 className="bedCat-b3">Select Bed Category for Booking</h3>
        
        <div className="bedCat-bed-cards">
          {wards.map((ward) => (
            <WardCard
              key={ward.ward}
              ward={ward}
              onBookingClick={() => {
                setSelectedWard(ward);
                setBookingModalOpen(true);
              }}
              onDetailsClick={() => {
                setSelectedWard(ward);
                setDetailsModalOpen(true);
              }}
            />
          ))}
        </div>

        {/* Booking Modal */}
        {isBookingModalOpen && (
          <div className="bedCat-modal" style={{ display: 'block' }}>
            <div className="bedCat-modal-content">
              <span className="bedCat-lightFont">Booking Details</span>
              <span className="bedCat-close" onClick={() => setBookingModalOpen(false)}>&times;</span>
              <form onSubmit={handleBookingSubmit}>
                <div className="bedCat-form-row">
                  <div className="bedCat-form-group">
                    <label htmlFor="aadhar">Aadhar Number:</label>
                    <input
                      type="text"
                      id="aadhar"
                      name="aadhar"
                      pattern="[0-9]{12}"
                      placeholder="Enter 12-digit Aadhar number"
                      required
                    />
                  </div>
                  <div className="bedCat-form-group">
                    <label htmlFor="prescription">
                      Prescription/Admission Note:
                    </label>
                    <input 
                      type="file" 
                      id="prescription" 
                      name="prescription"
                      accept=".pdf,.jpg,.jpeg,.png"
                      
                    />
                  </div>
                  <div className="bedCat-form-group">
                    <label htmlFor="date">Admission Date:</label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      required
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
        )}

        {/* Details Modal */}
        {isDetailsModalOpen && (
          <div className="bedCat-modal" style={{ display: 'block' }}>
            <div className="bedCat-modal-content">
              <span className="bedCat-close" onClick={() => setDetailsModalOpen(false)}>&times;</span>
              <div className="bedCat-details-content">
                <h2>{selectedWard.ward_name} Details</h2>
                <p>{selectedWard.ward_details}</p>
                <ul>
                  <li>Available Beds: {selectedWard.no_of_beds}</li>
                  <li>Cost per day: ₹{selectedWard.cost}</li>
                  {selectedWard.beds && selectedWard.beds.length > 0 && (
                    <li>
                      Beds: {selectedWard.beds.map((bed, index) => (
                        `Bed ${bed.bed_number || index + 1}`
                      )).join(', ')}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BedBooking;