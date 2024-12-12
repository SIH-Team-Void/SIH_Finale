// import React from 'react'
// import { Link } from 'react-router-dom';
// import Navbar from '../component/navbar';
// import '../css/bedNo.css';

// export default function bedNo() {
//   return (
//     <div className='bedNo-body'>
//       < Navbar/>
//       <div className="bedNo-options">
//           <Link to="/admin/addBed">
//           <button className="bedNo-activity" >
//             ADD OR CREATE WARD DETAILS
//             </button>
//             </Link>
//           <Link to="/admin/manageBed"> <button className="bedNo-activity"> MANAGE BEDS
//             </button></Link>
//             <Link to="/admin/bedNo"> <button className="bedNo-activity"> MANAGE REQUEST
//             </button></Link>
//         </div>
//         <div className="bedNo-requests">
//             <div className="bedNo-request">
//                 <div className="bedNo-info">
//                     <h4>Request no. 1</h4>
//                     <p>Ward detail: General ward</p>
//                     <p>Patient Name: Ashwin Vidhva</p>
//                     <a href="#" className="bedNo-view-doc">View Document</a>
//                 </div>
//                 <div className="bedNo-actions">
//                     <button className="bedNo-disapprove">Disapprove</button>
//                     <button className="bedNo-approve">Approve</button>
//                 </div>
//             </div>

//             <div className="bedNo-request">
//                 <div className="bedNo-info">
//                     <h4>Request no. 2</h4>
//                     <p>Ward detail: General ward</p>
//                     <p>Patient Name: Ashwin Vidhva</p>
//                     <a href="#" className="bedNo-view-doc">View Document</a>
//                 </div>
//                 <div className="bedNo-actions">
//                     <button className="bedNo-disapprove">Disapprove</button>
//                     <button className="bedNo-approve">Approve</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../component/navbar';
// import '../css/bedNo.css';

// export default function BedNo() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchBookingRequests();
//   }, []);

//   const fetchBookingRequests = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/bed_management/bookings/');
//       if (!response.ok) {
//         throw new Error('Failed to fetch booking requests');
//       }
//       const data = await response.json();
//       setRequests(data);
//     } catch (err) {
//       console.error('Error:', err);
//       // If fetch fails, use dummy data to maintain UI
//       setRequests([
//         {
//           id: 1,
//           ward_name: "General ward",
//           patient_name: "Ashwin Vidhva",
//           document_url: "#"
//         },
//         {
//           id: 2,
//           ward_name: "General ward",
//           patient_name: "Ashwin Vidhva",
//           document_url: "#"
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (requestId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/bookings/${requestId}/approve/`, {
//         method: 'POST',
//       });
//       if (response.ok) {
//         fetchBookingRequests(); // Refresh the list
//       }
//     } catch (err) {
//       console.error('Error approving request:', err);
//     }
//   };

//   const handleDisapprove = async (requestId) => {
//     try {
//       const response = await fetch(`http://localhost:8000/api/bookings/${requestId}/reject/`, {
//         method: 'POST',
//       });
//       if (response.ok) {
//         fetchBookingRequests(); // Refresh the list
//       }
//     } catch (err) {
//       console.error('Error rejecting request:', err);
//     }
//   };

//   return (
//     <div className='bedNo-body'>
//       <Navbar/>
//       <div className="bedNo-options">
//         <Link to="/admin/addBed">
//           <button className="bedNo-activity">
//             ADD OR CREATE WARD DETAILS
//           </button>
//         </Link>
//         <Link to="/admin/manageBed">
//           <button className="bedNo-activity">
//             MANAGE BEDS
//           </button>
//         </Link>
//         <Link to="/admin/bedNo">
//           <button className="bedNo-activity">
//             MANAGE REQUEST
//           </button>
//         </Link>
//       </div>
      
//       <div className="bedNo-requests">
//         {requests.map((request, index) => (
//           <div key={request.id} className="bedNo-request">
//             <div className="bedNo-info">
//               <h4>Request no. {index + 1}</h4>
//               <p>Ward detail: {request.ward_name}</p>
//               <p>Patient Name: {request.patient_name}</p>
//               <a 
//                 href={request.document_url} 
//                 className="bedNo-view-doc"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 View Document
//               </a>
//             </div>
//             <div className="bedNo-actions">
//               <button 
//                 className="bedNo-disapprove"
//                 onClick={() => handleDisapprove(request.id)}
//               >
//                 Disapprove
//               </button>
//               <button 
//                 className="bedNo-approve"
//                 onClick={() => handleApprove(request.id)}
//               >
//                 Approve
//               </button>
//             </div>
//           </div>
//         ))}
        
//         {requests.length === 0 && !loading && (
//           <div className="bedNo-no-requests">
//             No booking requests available.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// old code 


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../component/navbar';
// import '../css/bedNo.css';

// const BACKEND_URL = 'http://127.0.0.1:8000';

// export default function BedNo() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const storedHospitalId = localStorage.getItem('hosp_ID');
//     if (storedHospitalId) {
//       fetchBookingRequests();
//     } else {
//       setError('Hospital ID not found');
//       setLoading(false);
//     }
//   }, []);

//   const fetchBookingRequests = async () => {
//     const hospitalId = localStorage.getItem('hosp_ID');
//     if (!hospitalId || hospitalId === 'null') {
//       setLoading(false);
//       return;
//     }
    
//     try {
//       const response = await fetch(`${BACKEND_URL}/bed_management/bookings/${hospitalId}/`);
//       if (!response.ok) throw new Error('Failed to fetch booking requests');
//       const data = await response.json();
      
//       // Sort requests by status: pending first, then approved, then rejected
//       const sortedData = data.sort((a, b) => {
//         const statusOrder = { pending: 0, approved: 1, rejected: 2 };
//         return statusOrder[a.status] - statusOrder[b.status];
//       });
      
//       setRequests(sortedData);
//     } catch (err) {
//       console.error('Error:', err);
//       setError('Failed to load booking requests');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const findVacantBed = async (wardId, hospitalId) => {
//     try {
//       const response = await fetch(`${BACKEND_URL}/bed_management/ward/list/${hospitalId}/`);
//       if (!response.ok) throw new Error('Failed to fetch ward details');
      
//       const wards = await response.json();
//       const requestedWard = wards.find(ward => ward.id === wardId);
      
//       if (!requestedWard) {
//         throw new Error('Ward not found');
//       }
      
//       const vacantBed = requestedWard.beds?.find(bed => bed.status === 'vacant');
//       if (!vacantBed) {
//         throw new Error('No vacant beds available in this ward');
//       }
      
//       return vacantBed.id;
//     } catch (err) {
//       console.error('Error finding vacant bed:', err);
//       throw err;
//     }
//   };

//   const handleApprove = async (requestId, hospitalId, wardId) => {
//     try {
//       // Check if request is already processed
//       const request = requests.find(r => r.id === requestId);
//       if (request.status !== 'pending') {
//         alert('This request has already been processed');
//         return;
//       }

//       let vacantBedId;
//       try {
//         vacantBedId = await findVacantBed(wardId, hospitalId);
//       } catch (err) {
//         alert(err.message);
//         return;
//       }

//       const response = await fetch(`${BACKEND_URL}/bed_management/bookings/${requestId}/approve/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ bed_id: vacantBedId }),
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to approve request');
//       }

//       alert('Request approved successfully');
//       fetchBookingRequests();
//     } catch (err) {
//       console.error('Error:', err);
//       alert(err.message || 'Failed to approve request');
//     }
//   };

//   const handleDisapprove = async (requestId) => {
//     try {
//       // Check if request is already processed
//       const request = requests.find(r => r.id === requestId);
//       if (request.status !== 'pending') {
//         alert('This request has already been processed');
//         return;
//       }

//       const response = await fetch(`${BACKEND_URL}/bed_management/bookings/${requestId}/reject/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to reject request');
//       }

//       alert('Request rejected successfully');
//       fetchBookingRequests();
//     } catch (err) {
//       console.error('Error:', err);
//       alert(err.message || 'Failed to reject request');
//     }
//   };

//   if (loading) {
//     return (
//       <div className='bedNo-body'>
//         <Navbar/>
//         <div className="bedNo-loading">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className='bedNo-body'>
//       <Navbar/>
//       <div className="bedNo-options">
//         <Link to="/admin/addBed">
//           <button className="bedNo-activity">ADD OR CREATE WARD DETAILS</button>
//         </Link>
//         <Link to="/admin/manageBed">
//           <button className="bedNo-activity">MANAGE BEDS</button>
//         </Link>
//         <Link to="/admin/bedNo">
//           <button className="bedNo-activity">MANAGE REQUEST</button>
//         </Link>
//       </div>
      
//       {error && <div className="bedNo-error">{error}</div>}
      
//       <div className="bedNo-requests">
//         {requests.map((request, index) => (
//           <div key={request.id} className="bedNo-request">
//             <div className="bedNo-info">
//               <h4>Request no. {index + 1}</h4>
//               <p>Ward detail: {request.ward_name}</p>
//               <p>Aadhar Number: {request.aadhar_number}</p>
//               <p>Status: <span className={`status-${request.status}`}>{request.status}</span></p>
//               {request.prescription && (
//                 <a 
//                   href={request.prescription} 
//                   className="bedNo-view-doc" 
//                   target="_blank" 
//                   rel="noopener noreferrer"
//                 >
//                   View Document
//                 </a>
//               )}
//             </div>
//             {request.status === 'pending' && (
//               <div className="bedNo-actions">
//                 <button 
//                   className="bedNo-disapprove" 
//                   onClick={() => handleDisapprove(request.id)}
//                 >
//                   Disapprove
//                 </button>
//                 <button 
//                   className="bedNo-approve" 
//                   onClick={() => handleApprove(request.id, request.hospital, request.ward)}
//                 >
//                   Approve
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}
        
//         {requests.length === 0 && !loading && (
//           <div className="bedNo-no-requests">No booking requests available.</div>
//         )}
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Navbar from '../component/navbar';
// import '../css/bedNo.css';

// const BACKEND_URL = 'http://127.0.0.1:8000';
// const STATUS_ORDER = { pending: 0, approved: 1, rejected: 2 };

// export default function BedNo() {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false); // Track action-specific loading

//   const hospitalId = localStorage.getItem('hosp_ID');

//   useEffect(() => {
//     if (hospitalId) {
//       fetchBookingRequests();
//     } else {
//       setError('Hospital ID not found');
//       setLoading(false);
//     }
//   }, [hospitalId]);

//   const fetchBookingRequests = async () => {
//     const hospitalId = localStorage.getItem('hosp_ID'); // Get hospital ID from localStorage
//     if (!hospitalId || hospitalId === 'null') {
//         setLoading(false);
//         return;
//     }

//     try {
//         // Send GET request to fetch booking details using the hospitalId
//         const response = await fetch(`${BACKEND_URL}/bed_management/bookings/${hospitalId}/`);

//         // Check if the response was successful
//         if (!response.ok) {
//             throw new Error('Failed to fetch booking details');
//         }

//         const data = await response.json();

//         // If the data is not an array, wrap it in an array to handle it uniformly
//         const bookingRequests = Array.isArray(data) ? data : [data];

//         // Sort the booking requests based on status: pending first, then approved, then rejected
//         const sortedData = bookingRequests.sort((a, b) => {
//             const statusOrder = { pending: 0, approved: 1, rejected: 2 };
//             return statusOrder[a.status] - statusOrder[b.status];
//         });

//         // Set the sorted booking requests into state and replace id with book_id
//         const modifiedRequests = sortedData.map(request => ({
//             ...request,
//             id: request.book_id,  // Use book_id instead of id
//         }));

//         setRequests(modifiedRequests);

//     } catch (err) {
//         console.error('Error:', err);
//         setError('Failed to load booking requests');
//     } finally {
//         setLoading(false);
//     }
// };

  

// const findVacantBed = async (wardId, hospitalId) => {
//   try {
//       // Fetch ward details for the specified hospital
//       const response = await fetch(`${BACKEND_URL}/bed_management/ward/list/${hospitalId}/`);
      
//       if (!response.ok) {
//           throw new Error('Failed to fetch ward details');
//       }

//       const wards = await response.json();
//       console.log('Wards data:', wards);  // Log to check the structure of the response

//       if (wards.length === 0) {
//           throw new Error('No wards found for this hospital');
//       }
      
//       // Find the specific ward using the 'ward' field
//       const requestedWard = wards.find((ward) => ward.ward === wardId);  // Searching by ward ID
//       if (!requestedWard) {
//           throw new Error('Ward not found');
//       }
      
//       // Find a vacant bed in the requested ward
//       const vacantBed = requestedWard.beds?.find((bed) => bed.status === 'vacant');
//       if (!vacantBed) {
//           throw new Error('No vacant beds available in this ward');
//       }
      
//       return vacantBed.id;  // Return the bed id (e.g., "6-B001")
//   } catch (err) {
//       console.error('Error finding vacant bed:', err);
//       throw err;
//   }
// };






// const handleApprove = async (bookingId, hospitalId, wardId) => {
//   try {
//       // Check if the request is already processed
//       const booking = requests.find(r => r.book_id === bookingId);  // Use 'book_id' for booking ID
//       if (booking.status !== 'pending') {
//           alert('This request has already been processed');
//           return;
//       }

//       let vacantBedId;
//       try {
//           // Fetch ward details and find the vacant bed
//           const response = await fetch(`${BACKEND_URL}/bed_management/ward/list/${hospitalId}/`);
//           if (!response.ok) throw new Error('Failed to fetch ward details');
          
//           const wards = await response.json();
//           if (wards && Array.isArray(wards)) {
//               console.log('Wards data:', wards);  // Log the fetched wards data
//           } else {
//               throw new Error('Invalid ward data received');
//           }
          
//           // Find the requested ward using 'ward' instead of 'id'
//           const requestedWard = wards.find((ward) => ward.ward === wardId);  // Match 'ward' with wardId
//           if (!requestedWard) throw new Error('Ward not found');
          
//           // Find a vacant bed in the requested ward
//           const vacantBed = requestedWard.beds?.find((bed) => bed.status === 'vacant');
//           if (!vacantBed) throw new Error('No vacant beds available in this ward');
          
//           vacantBedId = vacantBed.id;  // Get the bed 'id'
//           vacantBed.status = 'occupied';  // Update bed status to 'occupied'

//           // Send request to update the bed status on the backend
//           const updateResponse = await fetch(`${BACKEND_URL}/bed_management/ward/update/${hospitalId}/`, {
//               method: 'POST',
//               headers: {
//                   'Content-Type': 'application/json',
//               },
//               body: JSON.stringify({
//                   ward: wardId,  // Use 'ward' instead of 'ward_id'
//                   id: vacantBedId,  // Pass 'bed_id'
//                   status: 'occupied'  // Update bed status
//               }),
//           });
          
//           if (!updateResponse.ok) {
//               const errorData = await updateResponse.json();
//               console.error('Error updating bed status:', errorData);
//               throw new Error(errorData.error || 'Failed to update bed status');
//           }

//       } catch (err) {
//           console.error('Error finding or updating vacant bed:', err);
//           alert(err.message);
//           return;
//       }

//       // Approve the booking and assign the vacant bed
//       const response = await fetch(`${BACKEND_URL}/bed_management/bookings/${bookingId}/approve/`, {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ bed_id: vacantBedId }),  // Use 'bed_id' instead of 'id'
//       });

//       if (!response.ok) {
//           const errorData = await response.json();
//           console.error('Error approving booking:', errorData);
//           throw new Error(errorData.error || 'Failed to approve request');
//       }

//       alert('Request approved successfully');
//       fetchBookingRequests();  // Refresh the list of booking requests
//   } catch (err) {
//       console.error('Error:', err);
//       alert(err.message || 'Failed to approve request');
//   }
// };


  
//   const handleDisapprove = async (bookingId) => {
//     try {
//       // Check if request is already processed
//       const booking = requests.find(r => r.id === bookingId);  // Use 'id' instead of 'request_id'
//       if (booking.status !== 'pending') {
//         alert('This request has already been processed');
//         return;
//       }
  
//       const response = await fetch(`${BACKEND_URL}/bed_management/bookings/${bookingId}/reject/`, {  // Use 'bookingId'
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         }
//       });
      
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to reject request');
//       }
  
//       alert('Request rejected successfully');
//       fetchBookingRequests();
//     } catch (err) {
//       console.error('Error:', err);
//       alert(err.message || 'Failed to reject request');
//     }
//   };

//   if (loading) {
//     return (
//       <div className='bedNo-body'>
//         <Navbar />
//         <div className="bedNo-loading">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className='bedNo-body'>
//       <Navbar />
//       <div className="bedNo-options">
//         <Link to="/admin/addBed">
//           <button className="bedNo-activity">ADD OR CREATE WARD DETAILS</button>
//         </Link>
//         <Link to="/admin/manageBed">
//           <button className="bedNo-activity">MANAGE BEDS</button>
//         </Link>
//         <Link to="/admin/bedNo">
//           <button className="bedNo-activity">MANAGE REQUEST</button>
//         </Link>
//       </div>

//       {error && (
//         <div className="bedNo-error">
//           {error} <button onClick={fetchBookingRequests}>Retry</button>
//         </div>
//       )}

//       <div className="bedNo-requests">
//         {requests.map((request, index) => (
//           <div key={request.id} className="bedNo-request">
//             <div className="bedNo-info">
//               <h4>Request no. {index + 1}</h4>
//               <p>Ward detail: {request.ward_name}</p>
//               <p>Aadhar Number: {request.aadhar_number}</p>
//               <p>Status: <span className={`status-${request.status}`}>{request.status}</span></p>
//               {request.prescription && (
//                 <a
//                   href={request.prescription}
//                   className="bedNo-view-doc"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   View Document
//                 </a>
//               )}
//             </div>
//             {request.status === 'pending' && !actionLoading && (
//               <div className="bedNo-actions">
//                 <button
//                   className="bedNo-disapprove"
//                   onClick={() => handleDisapprove(request.id)}
//                 >
//                   Disapprove
//                 </button>
//                 <button
//                   className="bedNo-approve"
//                   onClick={() => handleApprove(request.id, request.ward)}
//                 >
//                   Approve
//                 </button>
//               </div>
//             )}
//           </div>
//         ))}

//         {requests.length === 0 && !loading && (
//           <div className="bedNo-no-requests">No booking requests available.</div>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/bedNo.css';

const BACKEND_URL = 'http://127.0.0.1:8000';

export default function BedNo() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const hospitalId = localStorage.getItem('hosp_ID');

  useEffect(() => {
    if (hospitalId) {
      fetchBookingRequests();
    } else {
      setError('Hospital ID not found');
      setLoading(false);
    }
  }, [hospitalId]);

  const fetchBookingRequests = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/bed_management/bookings/create/${hospitalId}/`);
      if (!response.ok) {
        throw new Error('Failed to fetch booking details');
      }

      const data = await response.json();
      const bookingRequests = Array.isArray(data) ? data : [data];

      // Sort requests: pending first, then approved, then rejected
      const sortedData = bookingRequests.sort((a, b) => {
        const statusOrder = { pending: 0, approved: 1, rejected: 2 };
        return statusOrder[a.status] - statusOrder[b.status];
      });

      setRequests(sortedData);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to load booking requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId, wardId) => {
    try {
      console.log('Booking ID:', bookingId);
      console.log('Ward ID:', wardId);
      
      const booking = requests.find(r => r.book_id === bookingId);
      console.log('Found booking:', booking);
  
      if (!booking) {
        throw new Error('Booking request not found');
      }
  
      if (booking.status !== 'pending') {
        alert('This request has already been processed');
        return;
      }
  
      setActionLoading(true);
  
      // 1. Fetch ward details to find vacant bed
      const wardResponse = await fetch(`${BACKEND_URL}/bed_management/ward/list/${hospitalId}/`);
      if (!wardResponse.ok) {
        throw new Error('Failed to fetch ward details');
      }
  
      const wards = await wardResponse.json();
      console.log('Wards data:', wards);
      
      // Convert wardId to string for comparison since API returns string ward IDs
      const requestedWard = wards.find((ward) => ward.ward === String(wardId));
      console.log('Found ward:', requestedWard);
      
      if (!requestedWard) {
        throw new Error('Ward not found');
      }
  
      const vacantBed = requestedWard.beds?.find((bed) => bed.status === 'vacant');
      if (!vacantBed) {
        throw new Error('No vacant beds available in this ward');
      }
  
      // Updated URL structure to match your Django URL pattern
      const approveResponse = await fetch(`${BACKEND_URL}/bed_management/bookings/${bookingId}/approve/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bed_id: vacantBed.id
        }),
      });
  
      // Handle non-JSON responses
      const contentType = approveResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        if (!approveResponse.ok) {
          throw new Error(`Server error: ${approveResponse.status}`);
        }
      }
  
      const data = await approveResponse.json();
      
      if (!approveResponse.ok) {
        throw new Error(data.error || 'Failed to approve request');
      }
  
      alert('Request approved successfully');
      await fetchBookingRequests(); // Refresh the list
  
    } catch (err) {
      console.error('Error:', err);
      alert(err.message || 'Failed to approve request');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDisapprove = async (bookingId) => {
    try {
      const booking = requests.find(r => r.book_id === bookingId);
      if (booking.status !== 'pending') {
        alert('This request has already been processed');
        return;
      }

      const response = await fetch(`${BACKEND_URL}/bed_management/bookings/${bookingId}/reject/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reject request');
      }

      alert('Request rejected successfully');
      fetchBookingRequests();
    } catch (err) {
      console.error('Error:', err);
      alert(err.message || 'Failed to reject request');
    }
  };

  if (loading) {
    return (
      <div className='bedNo-body'>
        <Navbar />
        <div className="bedNo-loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className='bedNo-body'>
      <Navbar />
      <div className="bedNo-options">
        <Link to="/admin/addBed">
          <button className="bedNo-activity">ADD OR CREATE WARD DETAILS</button>
        </Link>
        <Link to="/admin/manageBed">
          <button className="bedNo-activity">MANAGE BEDS</button>
        </Link>
        <Link to="/admin/bedNo">
          <button className="bedNo-activity">MANAGE REQUEST</button>
        </Link>
        {/* <Link to="/admin/bedlist">
                        <button className="bedNo-activity">BED LIST</button>
                    </Link> */}
      </div>

      {error && (
        <div className="bedNo-error">
          {error} <button onClick={fetchBookingRequests}>Retry</button>
        </div>
      )}

      <div className="bedNo-requests">
        {requests.map((request, index) => (
          <div key={request.book_id} className="bedNo-request">
            <div className="bedNo-info">
              <h4>Request no. {index + 1}</h4>
              <p>Ward detail: {request.ward_name}</p>
              <p>Aadhar Number: {request.aadhar_number}</p>
              <p>Status: <span className={`status-${request.status}`}>{request.status}</span></p>
              {request.prescription && (
                <a
                  href={request.prescription}
                  className="bedNo-view-doc"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Document
                </a>
              )}
            </div>
            {request.status === 'pending' && !actionLoading && (
              <div className="bedNo-actions">
                <button
                  className="bedNo-disapprove"
                  onClick={() => handleDisapprove(request.book_id)}
                >
                  Disapprove
                </button>
                <button
                  className="bedNo-approve"
                  onClick={() => handleApprove(request.book_id, request.ward)}
                  disabled={actionLoading}
                >
                  {actionLoading ? 'Processing...' : 'Approve'}
                </button>
              </div>
            )}
          </div>
        ))}

        {requests.length === 0 && !loading && (
          <div className="bedNo-no-requests">No booking requests available.</div>
        )}
      </div>
    </div>
  );
}