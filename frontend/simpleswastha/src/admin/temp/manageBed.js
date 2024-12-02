  // import React, { useState } from 'react';
  // import { Link } from 'react-router-dom';
  // import Navbar from '../component/navbar';
  // import '../css/manageBed.css';

  // export default function ManageBed() {
  //   // Mock data for wards and beds
  //   const [wards, setWards] = useState({
  //     "Ward A": [
  //       { bed_id: 1, status: 'vacant' },
  //       { bed_id: 2, status: 'occupied' },
  //       { bed_id: 3, status: 'maintenance' },
  //     ],
  //     "Ward B": [
  //       { bed_id: 4, status: 'vacant' },
  //       { bed_id: 5, status: 'occupied' },
  //     ],
  //     "Ward C": [
  //       { bed_id: 6, status: 'vacant' },
  //       { bed_id: 7, status: 'maintenance' },
  //     ],
  //   });

  //   const [modalData, setModalData] = useState({
  //     bedNumber: '',
  //     wardName: '',
  //     status: '',
  //   });
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  //   // Open modal and set modal data
  //   const handleBedClick = (bed, wardName) => {
  //     setModalData({
  //       bedNumber: bed.bed_id,
  //       wardName,
  //       status: bed.status,
  //     });
  //     setIsModalOpen(true);
  //   };

  //   // Close the modal
  //   const closeModal = () => {
  //     setIsModalOpen(false);
  //   };

  //   // Update the status of a bed and reflect changes in the UI
  //   const handleStatusChange = (status) => {
  //     const updatedWards = { ...wards };
  //     const wardBeds = updatedWards[modalData.wardName];
  //     const bedIndex = wardBeds.findIndex((bed) => bed.bed_id === modalData.bedNumber);

  //     if (bedIndex !== -1) {
  //       wardBeds[bedIndex].status = status;
  //     }

  //     setWards(updatedWards); // Update state with new bed status
  //     setIsModalOpen(false);
  //   };

  //   return (
  //     <div>
  //       <Navbar />
  //       <div className="manageBed-container">
  //         <div className="manageBed-options">
  //           <Link to="/admin/addBed">
  //           <button className="manageBed-activity">
  //           ADD OR CREATE WARD DETAILS
  //           </button>
  //           </Link>
  //           <Link to="/admin/manageBed">
  //           <button className="manageBed-activity active">
  //           MANAGE BEDS
  //           </button>
  //           </Link>
  //         </div>
  //         <div className="manageBed-content">
  //           <h3>Select Ward</h3>
  //           <div className="manageBed-select-ward">
  //             <input type="text" id="wardName" placeholder="Search Ward Name" />
  //           </div>
  //           <div className="manageBed-legend">
  //             <span>
  //               <div className="manageBed-circle occupied"></div>Occupied
  //             </span>
  //             <span>
  //               <div className="manageBed-circle vacant"></div>Vacant
  //             </span>
  //             <span>
  //               <div className="manageBed-circle maintenance"></div>Maintenance
  //             </span>
  //           </div>

  //           {Object.keys(wards).map((wardName) => (
  //             <div key={wardName}>
  //               <h3>{wardName}</h3>
  //               <div className="manageBed-beds">
  //                 {wards[wardName].map((bed) => (
  //                   <div
  //                     key={bed.bed_id}
  //                     className={`manageBed-bed manageBed-${bed.status}`}
  //                     onClick={() => handleBedClick(bed, wardName)}
  //                   >
  //                     BED {bed.bed_id}
  //                     <br />
  //                     {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
  //                   </div>
  //                 ))}
  //               </div>
  //             </div>
  //           ))}

  //           {isModalOpen && (
  //             <div className="manageBed-modal">
  //               <div className="manageBed-modal-content">
  //                 <span className="manageBed-close" onClick={closeModal}>
  //                   &times;
  //                 </span>
  //                 <h3>Change Status of Bed {modalData.bedNumber} in {modalData.wardName}</h3>
  //                 <p>Status: {modalData.status}</p>
  //                 <div className="manageBed-modal-buttons">
  //                   <button onClick={() => handleStatusChange('vacant')}>Vacant</button>
  //                   <button onClick={() => handleStatusChange('occupied')}>Occupied</button>
  //                   <button onClick={() => handleStatusChange('maintenance')}>Maintenance</button>
  //                 </div>
  //               </div>
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }





  // import React, { useState, useEffect } from 'react';
  // import axios from 'axios';
  
  // const WardBedManagement = () => {
  //   const [wards, setWards] = useState([]);
  //   const [newWard, setNewWard] = useState({
  //     ward_name: '',
  //     no_of_beds: '',
  //     cost: '',
  //     ward_details: ''
  //   });
  
  //   // Fetch existing wards
  //   useEffect(() => {
  //     const fetchWards = async () => {
  //       try {
  //         const response = await axios.get('/api/ward/list/');
  //         setWards(response.data);
  //       } catch (error) {
  //         console.error('Error fetching wards:', error);
  //       }
  //     };
  //     fetchWards();
  //   }, []);
  
  //   // Handle new ward creation
  //   const handleCreateWard = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const response = await axios.post('/bed_management/ward/list/', newWard);
  //       setWards([...wards, response.data]);
  //       // Reset form
  //       setNewWard({
  //         ward_name: '',
  //         no_of_beds: '',
  //         cost: '',
  //         ward_details: ''
  //       });
  //     } catch (error) {
  //       console.error('Error creating ward:', error);
  //     }
  //   };
  
  //   // Update bed status
  //   const updateBedStatus = async (wardId, bedId, newStatus) => {
  //     try {
  //       await axios.put('/bed_management/ward/update-bed-status/', {
  //         ward_id: wardId,
  //         bed_id: bedId,
  //         status: newStatus
  //       });
        
  //       // Refresh wards to reflect changes
  //       const response = await axios.get('/api/ward/list/');
  //       setWards(response.data);
  //     } catch (error) {
  //       console.error('Error updating bed status:', error);
  //     }
  //   };
  
  //   return (
  //     <div className="ward-bed-management">
  //       <h1>Ward and Bed Management</h1>
        
  //       {/* Ward Creation Form */}
  //       <form onSubmit={handleCreateWard}>
  //         <input
  //           type="text"
  //           placeholder="Ward Name"
  //           value={newWard.ward_name}
  //           onChange={(e) => setNewWard({...newWard, ward_name: e.target.value})}
  //           required
  //         />
  //         <input
  //           type="number"
  //           placeholder="Number of Beds"
  //           value={newWard.no_of_beds}
  //           onChange={(e) => setNewWard({...newWard, no_of_beds: e.target.value})}
  //           required
  //         />
  //         <input
  //           type="number"
  //           placeholder="Ward Cost"
  //           value={newWard.cost}
  //           onChange={(e) => setNewWard({...newWard, cost: e.target.value})}
  //           required
  //         />
  //         <textarea
  //           placeholder="Ward Details"
  //           value={newWard.ward_details}
  //           onChange={(e) => setNewWard({...newWard, ward_details: e.target.value})}
  //           required
  //         />
  //         <button type="submit">Create Ward</button>
  //       </form>
  
  //       {/* Ward and Bed Display */}
  //       {wards.map(ward => (
  //         <div key={ward.id} className="ward-section">
  //           <h2>{ward.ward_name}</h2>
  //           <p>Total Beds: {ward.no_of_beds}</p>
  //           <p>Ward Status: {ward.status}</p>
            
  //           <div className="beds-container">
  //             {ward.beds.map(bed => (
  //               <div key={bed.id} className="bed-card">
  //                 <span>Bed ID: {bed.id}</span>
  //                 <span>Status: {bed.status}</span>
  //                 <div className="status-buttons">
  //                   <button onClick={() => updateBedStatus(ward.id, bed.id, 'vacant')}>
  //                     Set Vacant
  //                   </button>
  //                   <button onClick={() => updateBedStatus(ward.id, bed.id, 'occupied')}>
  //                     Set Occupied
  //                   </button>
  //                   <button onClick={() => updateBedStatus(ward.id, bed.id, 'maintenance')}>
  //                     Set Maintenance
  //                   </button>
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // };
  
  // export default WardBedManagement;








  // import React, { useState, useEffect } from 'react';
  // import { Link } from 'react-router-dom';
  // import Navbar from '../component/navbar';
  // import '../css/manageBed.css';
  
  // export default function ManageBed() {
  //     const [wards, setWards] = useState([]);
  //     const [searchTerm, setSearchTerm] = useState('');
  //     const [modalData, setModalData] = useState({
  //         bedNumber: '',
  //         wardName: '',
  //         status: '',
  //     });
  //     const [isModalOpen, setIsModalOpen] = useState(false);
  
  //     useEffect(() => {
  //         const fetchWardsData = async () => {
  //             try {
  //                 const response = await fetch('http://127.0.0.1:8000/bed_management/ward/list/');
  //                 const data = await response.json();
  //                 setWards(data);
  //             } catch (error) {
  //                 console.error('Error fetching wards:', error);
  //             }
  //         };
  
  //         fetchWardsData();
  //     }, []);
  
  //     const handleBedClick = (bed, wardName) => {
  //         setModalData({
  //             bedNumber: bed.id,
  //             wardName,
  //             status: bed.status,
  //         });
  //         setIsModalOpen(true);
  //     };
  
  //     const closeModal = () => {
  //         setIsModalOpen(false);
  //     };
  
  //     const handleStatusChange = async (status) => {
  //         try {
  //             const response = await fetch('http://127.0.0.1:8000/bed_management/ward/update-bed-status/', {
  //                 method: 'PUT',
  //                 headers: {
  //                     'Content-Type': 'application/json',
  //                 },
  //                 body: JSON.stringify({
  //                     bed_id: modalData.bedNumber,
  //                     status: status
  //                 })
  //             });
  
  //             if (!response.ok) {
  //                 throw new Error('Failed to update bed status');
  //             }
  
  //             // Refresh wards data
  //             const wardsResponse = await fetch('/api/ward/list/');
  //             const updatedWards = await wardsResponse.json();
  //             setWards(updatedWards);
  //             setIsModalOpen(false);
  //         } catch (error) {
  //             console.error('Error updating bed status:', error);
  //         }
  //     };
  
  //     const filteredWards = wards.filter(ward => 
  //         ward.ward_name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  
  //     return (
  //         <div>
  //             <Navbar />
  //             <div className="manageBed-container">
  //                 <div className="manageBed-options">
  //                     <Link to="/admin/addBed">
  //                         <button className="manageBed-activity">
  //                             ADD OR CREATE WARD DETAILS
  //                         </button>
  //                     </Link>
  //                     <Link to="/admin/manageBed">
  //                         <button className="manageBed-activity active">
  //                             MANAGE BEDS
  //                         </button>
  //                     </Link>
  //                 </div>
  //                 <div className="manageBed-content">
  //                     <h3>Select Ward</h3>
  //                     <div className="manageBed-select-ward">
  //                         <input 
  //                             type="text" 
  //                             id="wardName" 
  //                             placeholder="Search Ward Name"
  //                             value={searchTerm}
  //                             onChange={(e) => setSearchTerm(e.target.value)}
  //                         />
  //                     </div>
  //                     <div className="manageBed-legend">
  //                         <span>
  //                             <div className="manageBed-circle occupied"></div>Occupied
  //                         </span>
  //                         <span>
  //                             <div className="manageBed-circle vacant"></div>Vacant
  //                         </span>
  //                         <span>
  //                             <div className="manageBed-circle maintenance"></div>Maintenance
  //                         </span>
  //                     </div>
  
  //                     {filteredWards.map((ward) => (
  //                         <div key={ward.id}>
  //                             <h3>{ward.ward_name}</h3>
  //                             <div className="manageBed-beds">
  //                                 {ward.beds.map((bed) => (
  //                                     <div
  //                                         key={bed.id}
  //                                         className={`manageBed-bed manageBed-${bed.status}`}
  //                                         onClick={() => handleBedClick(bed, ward.ward_name)}
  //                                     >
  //                                         BED {bed.id}
  //                                         <br />
  //                                         {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
  //                                     </div>
  //                                 ))}
  //                             </div>
  //                         </div>
  //                     ))}
  
  //                     {isModalOpen && (
  //                         <div className="manageBed-modal">
  //                             <div className="manageBed-modal-content">
  //                                 <span className="manageBed-close" onClick={closeModal}>
  //                                     &times;
  //                                 </span>
  //                                 <h3>Change Status of Bed {modalData.bedNumber} in {modalData.wardName}</h3>
  //                                 <p>Current Status: {modalData.status}</p>
  //                                 <div className="manageBed-modal-buttons">
  //                                     <button onClick={() => handleStatusChange('vacant')}>Vacant</button>
  //                                     <button onClick={() => handleStatusChange('occupied')}>Occupied</button>
  //                                     <button onClick={() => handleStatusChange('maintenance')}>Maintenance</button>
  //                                 </div>
  //                             </div>
  //                         </div>
  //                     )}
  //                 </div>
  //             </div>
  //         </div>
  //     );
  // }



  import React, { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import Navbar from '../component/navbar';
  import '../css/manageBed.css';
  
  export default function ManageBed() {
      const [wards, setWards] = useState([]);
      const [searchTerm, setSearchTerm] = useState('');
      const [modalData, setModalData] = useState({
          bedNumber: '',
          wardName: '',
          status: '',
      });
      const [isModalOpen, setIsModalOpen] = useState(false);
  
      // Fetch wards data from backend
      useEffect(() => {
          const fetchWardsData = async () => {
              try {
                  const response = await fetch('http://127.0.0.1:8000/bed_management/ward/list/');
                  const data = await response.json();
                  setWards(data);
              } catch (error) {
                  console.error('Error fetching wards:', error);
              }
          };
  
          fetchWardsData();
      }, []);
  
      // Handle bed click to open modal
      const handleBedClick = (bed, wardName) => {
          setModalData({
              bedNumber: bed.id,
              wardName,
              status: bed.status,
          });
          setIsModalOpen(true);
      };
  
      // Close modal
      const closeModal = () => {
          setIsModalOpen(false);
      };
  
      // Handle status change for bed
      const handleStatusChange = async (status) => {
          try {
              // Update bed status in backend
              const response = await fetch('http://127.0.0.1:8000/bed_management/ward/update-bed-status/', {
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      bed_id: modalData.bedNumber,
                      status: status,
                  })
              });
  
              if (!response.ok) {
                  throw new Error('Failed to update bed status');
              }
  
              // Refresh wards data to reflect updated bed status
              const wardsResponse = await fetch('http://127.0.0.1:8000/bed_management/ward/list/');
              const updatedWards = await wardsResponse.json();
              setWards(updatedWards);
              setIsModalOpen(false);
          } catch (error) {
              console.error('Error updating bed status:', error);
          }
      };
  
      // Filter wards based on search term
      const filteredWards = wards.filter(ward =>
          ward.ward_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      return (
          <div>
              <Navbar />
              <div className="manageBed-container">
                  <div className="manageBed-options">
                      <Link to="/admin/addBed">
                          <button className="manageBed-activity">
                              ADD OR CREATE WARD DETAILS
                          </button>
                      </Link>
                      <Link to="/admin/manageBed">
                          <button className="manageBed-activity active">
                              MANAGE BEDS
                          </button>
                      </Link>
                  </div>
                  <div className="manageBed-content">
                      <h3>Select Ward</h3>
                      <div className="manageBed-select-ward">
                          <input
                              type="text"
                              id="wardName"
                              placeholder="Search Ward Name"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                          />
                      </div>
                      <div className="manageBed-legend">
                          <span>
                              <div className="manageBed-circle occupied"></div>Occupied
                          </span>
                          <span>
                              <div className="manageBed-circle vacant"></div>Vacant
                          </span>
                          <span>
                              <div className="manageBed-circle maintenance"></div>Maintenance
                          </span>
                      </div>
  
                      {filteredWards.map((ward) => (
                          <div key={ward.id}>
                              <h3>{ward.ward_name}</h3>
                              <div className="manageBed-beds">
                                  {ward.beds.map((bed) => (
                                      <div
                                          key={bed.id}
                                          className={`manageBed-bed manageBed-${bed.status}`}
                                          onClick={() => handleBedClick(bed, ward.ward_name)}
                                      >
                                          BED {bed.id}
                                          <br />
                                          {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
                                      </div>
                                  ))}
                              </div>
                          </div>
                      ))}
  
                      {isModalOpen && (
                          <div className="manageBed-modal">
                              <div className="manageBed-modal-content">
                                  <span className="manageBed-close" onClick={closeModal}>
                                      &times;
                                  </span>
                                  <h3>Change Status of Bed {modalData.bedNumber} in {modalData.wardName}</h3>
                                  <p>Current Status: {modalData.status}</p>
                                  <div className="manageBed-modal-buttons">
                                      <button onClick={() => handleStatusChange('vacant')}>Vacant</button>
                                      <button onClick={() => handleStatusChange('occupied')}>Occupied</button>
                                      <button onClick={() => handleStatusChange('maintenance')}>Maintenance</button>
                                  </div>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      );
  }
  