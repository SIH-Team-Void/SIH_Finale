
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/manageBed.css';

export default function ManageBed() {
    const [wards, setWards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
    const [offcanvasAction, setOffcanvasAction] = useState('');
    const [isLoading, setIsLoading] = useState({});
    const [patientName, setPatientName] = useState('');
    const [drName, setDrName] = useState('');
    const [department, setDepartment] = useState('');
    // Add these new state variables with your other useState declarations
    const [sipDate, setSipDate] = useState('');
    const [sipError, setSipError] = useState('');
    const [sipSuccess, setSipSuccess] = useState('');
    
    const [modalData, setModalData] = useState({
        bedNumber: '',
        wardName: '',
        status: '',
        wardId: ''
    });
    const [admissionData, setAdmissionData] = useState({
        patientName: '',
        doctorName: '',
        admissionDate: '',
        admissionLetter: null
    });

    

    // Sample data - replace with actual data from your API
    const doctors = ['Dr. Tejal Shah', 'Dr. Ajit Vora', 'Dr. Dilip Kumar'];
    const departments = ['Cardiology', 'Neurology', 'Orthopedics'];

    useEffect(() => {
        const fetchWardsData = async () => {
            const hosp_ID = localStorage.getItem('hosp_ID');
            try {
                const response = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
                const data = await response.json();
                setWards(data);
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        };
        fetchWardsData();
    }, []);

    const handleBedClick = (bed, wardName, wardId) => {
        setModalData({
            bedNumber: bed.id,
            wardName,
            status: bed.status,
            wardId: wardId
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const closeOffcanvas = () => {
        setIsOffcanvasOpen(false);
        setOffcanvasAction('');
        setPatientName('');
        setDrName('');
        setDepartment('');

        setAdmissionData({
            patientName: '',
            doctorName: '',
            admissionDate: '',
            admissionLetter: null
        });
    };

    const handleAddBed = async (ward) => {
        // Prevent multiple submissions for the same ward
        if (isLoading[ward.ward]) {
            return;
        }
    
        const hosp_ID = localStorage.getItem('hosp_ID');
        
        // Set loading state for this specific ward
        setIsLoading(prev => ({ ...prev, [ward.ward]: true }));
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/bed_management/ward/add/${hosp_ID}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ward: ward.ward
                })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.error || 'Failed to add bed');
            }
    
            // Refresh ward data
            const wardsResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
            if (!wardsResponse.ok) {
                throw new Error('Failed to refresh ward data');
            }
    
            const updatedWards = await wardsResponse.json();
            setWards(updatedWards);
    
        } catch (error) {
            console.error('Error adding bed:', error);
            alert(error.message || 'Failed to add bed. Please try again.');
        } finally {
            // Reset loading state for this ward
            setIsLoading(prev => ({ ...prev, [ward.ward]: false }));
        }
    };

    const handleDeleteBed = async (bedId, ward) => {
        // Show confirmation dialog
        if (!window.confirm('Are you sure you want to delete this bed? This action cannot be undone.')) {
            return;
        }

        const hosp_ID = localStorage.getItem('hosp_ID');
        try {
            const response = await fetch(`http://127.0.0.1:8000/bed_management/ward/delete-bed/${hosp_ID}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ward: ward.ward,
                    ward_name: ward.ward_name,
                    no_of_beds: ward.no_of_beds - 1,  // Decrement bed count
                    hospital: ward.hospital,
                    cost: ward.cost,
                    ward_img: ward.ward_img,
                    ward_details: ward.ward_details
                })
            });

            if (!response.ok) {
                throw new Error('Failed to delete bed');
            }

            // Refresh ward data to get updated bed list
            const wardsResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
            const updatedWards = await wardsResponse.json();
            setWards(updatedWards);
        } catch (error) {
            console.error('Error deleting bed:', error);
            alert('Failed to delete bed. Please try again.');
        }
    };

    const handleStatusChange = (status) => {
        // For occupied beds going to vacant, we need to check current status
        if (modalData.status === 'occupied' && status === 'vacant') {
            // Open offcanvas with vacant forms (discharge/SIP Out/death)
            setIsModalOpen(false);
            setOffcanvasAction('vacant');
            setIsOffcanvasOpen(true);
            return;
        }
        
        // For non-occupied beds going to occupied
        if (status === 'occupied') {
            setIsModalOpen(false);
            setOffcanvasAction(status);
            setIsOffcanvasOpen(true);
            return;
        }
        
        // For other statuses (vacant, maintenance), proceed with immediate update
        const updateStatus = async () => {
            const hosp_ID = localStorage.getItem('hosp_ID');
            try {
                const response = await fetch(`http://127.0.0.1:8000/bed_management/ward/update-bed-status/${hosp_ID}/`, {
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
    
                setIsModalOpen(false);
                setOffcanvasAction(status);
                setIsOffcanvasOpen(true);
    
                const wardsResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
                const updatedWards = await wardsResponse.json();
                setWards(updatedWards);
            } catch (error) {
                console.error('Error updating bed status:', error);
                alert('Failed to update bed status. Please try again.');
            }
        };
    
        if (status !== 'occupied') {
            updateStatus();
        }
    };


    

    

    

    const handlePatientAdmission = async (e) => {
        e.preventDefault();
        const hosp_ID = localStorage.getItem('hosp_ID');
        
        try {
            const formData = new FormData();
            formData.append('patient_name', admissionData.patientName);
            formData.append('doctor_name', admissionData.doctorName);
            formData.append('ward_id', modalData.wardId);     // Changed to ward_id
            formData.append('bed_id', modalData.bedNumber);   // Changed to bed_id
            formData.append('admission_date', admissionData.admissionDate);
            formData.append('admission_letter', admissionData.admissionLetter);
            // formData.append('hospital', hosp_ID); // Add this for serializer
            // formData.append('hospital_id', hosp_ID);
    
            // Log what we're sending
            console.log('===== Form Data Being Sent =====');
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
    
            const admissionResponse = await fetch(`http://127.0.0.1:8000/bed_management/patient-admission/${hosp_ID}/`, {
                method: 'POST',
                body: formData
            });
    
            const responseText = await admissionResponse.text();
            console.log('Raw server response:', responseText);
    
            if (!admissionResponse.ok) {
                try {
                    const errorData = JSON.parse(responseText);
                    const errorMessage = Object.entries(errorData)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join('\n');
                    throw new Error(errorMessage);
                } catch (e) {
                    throw new Error(responseText);
                }
            }
    
            const responseData = JSON.parse(responseText);
            alert(`Patient admitted successfully. Patient ID: ${responseData.patient_id}`);
    
            // Update bed status locally
            setWards(prevWards => 
                prevWards.map(ward => ({
                    ...ward,
                    beds: ward.beds.map(bed => 
                        bed.id === modalData.bedNumber 
                            ? { ...bed, status: 'occupied' }
                            : bed
                    )
                }))
            );
    
            // Refresh ward data
            const wardsResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
            const updatedWards = await wardsResponse.json();
            setWards(updatedWards);
    
            closeOffcanvas();
    
        } catch (error) {
            console.error('Error processing admission:', error);
            alert(error.message);
        }
    };

    const handleSIPIn = async (e) => {
        e.preventDefault();
        const hosp_ID = localStorage.getItem('hosp_ID');
    
        try {
            // First update the bed status
            const statusResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/update-bed-status/${hosp_ID}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bed_id: modalData.bedNumber,
                    status: 'occupied',
                })
            });
    
            if (!statusResponse.ok) {
                throw new Error('Failed to update bed status');
            }
    
            // Here you would typically save the SIP In details
            // Add your API call to save SIP details here
            console.log('SIP In submitted:', { department });
    
            // Refresh the ward data
            const wardsResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
            const updatedWards = await wardsResponse.json();
            setWards(updatedWards);
    
            // Close the offcanvas after successful submission
            closeOffcanvas();
        } catch (error) {
            console.error('Error processing SIP In:', error);
            alert('Failed to process SIP In. Please try again.');
        }
    };

    const handlePatientDischarge = async (e) => {
        e.preventDefault();
        const hosp_ID = localStorage.getItem('hosp_ID');
        
        try {
            // Get form data
            const formData = new FormData();
            formData.append('bed_id', modalData.bedNumber);
            formData.append('discharge_date', e.target.discharge_date.value);
            formData.append('discharge_document', e.target.discharge_document.files[0]);
            
            // Create discharge record
            const dischargeResponse = await fetch(`http://127.0.0.1:8000/bed_management/discharge/${hosp_ID}/`, {
                method: 'POST',
                body: formData,
            });
    
            if (!dischargeResponse.ok) {
                const errorData = await dischargeResponse.json();
                throw new Error(errorData.error || 'Failed to create discharge record');
            }
    
            // Successfully created discharge record
            // The bed status is already updated to 'vacant' in the backend
            console.log('Patient discharged successfully');
            
            // Refresh ward data to reflect the new bed status
            const wardsResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
            const updatedWards = await wardsResponse.json();
            setWards(updatedWards);
            
            // Close the offcanvas
            closeOffcanvas();
            
            // Optional: Show success message
            alert('Patient discharged successfully');
            
        } catch (error) {
            console.error('Error processing discharge:', error);
            alert(`Failed to process discharge: ${error.message}`);
        }
    };

    

    const handleSIPOut = async (e) => {
        e.preventDefault();
        setSipError('');
        setSipSuccess('');
    
        if (!department || !sipDate) {
            setSipError('Please select both ward and date');
            return;
        }
    
        const hosp_ID = localStorage.getItem('hosp_ID');
    
        try {
            // First, find a vacant bed in the selected ward
            const selectedWardData = wards.find(w => w.ward === department);
            const vacantBed = selectedWardData?.beds?.find(b => b.status === 'vacant');
    
            if (!vacantBed) {
                throw new Error('No vacant beds available in selected ward');
            }
    
            // Get current admission details for the old bed
            const admissionResponse = await fetch(`http://127.0.0.1:8000/bed_management/patient-admission/${hosp_ID}/`);
            const admissionData = await admissionResponse.json();
            
            console.log('Admission Response:', admissionData);
    
            const currentAdmission = admissionData.admissions.find(a => a.bed_id === modalData.bedNumber);
    
            if (!currentAdmission) {
                throw new Error('Current admission details not found');
            }
    
            // Create a simple text file as transfer document
            const transferText = `Transfer document for patient ${currentAdmission.patient_name} 
                from bed ${modalData.bedNumber} to bed ${vacantBed.id}
                Transfer Date: ${sipDate}`;
            const transferBlob = new Blob([transferText], { type: 'text/plain' });
            const transferFile = new File([transferBlob], 'transfer_document.txt', { type: 'text/plain' });
    
            // Create new admission in the target ward
            const formData = new FormData();
            formData.append('patient_name', currentAdmission.patient_name);
            formData.append('doctor_name', currentAdmission.doctor_name);
            formData.append('ward_id', department);
            formData.append('bed_id', vacantBed.id);
            formData.append('admission_date', sipDate);
            formData.append('admission_letter', transferFile);  // Add transfer document
    
            // Log FormData contents for debugging
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
    
            const transferResponse = await fetch(`http://127.0.0.1:8000/bed_management/patient-admission/${hosp_ID}/`, {
                method: 'POST',
                body: formData
            });
    
            const responseText = await transferResponse.text();
            console.log('Transfer Response:', responseText);
    
            if (!transferResponse.ok) {
                let errorMessage;
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.error || 
                                 Object.entries(errorData).map(([key, value]) => `${key}: ${value}`).join(', ') ||
                                 'Failed to transfer patient';
                } catch {
                    errorMessage = responseText || 'Failed to transfer patient';
                }
                throw new Error(errorMessage);
            }
    
            // Update old bed status to vacant
            const bedUpdateResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/update-bed-status/${hosp_ID}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bed_id: modalData.bedNumber,
                    status: 'vacant',
                })
            });
    
            if (!bedUpdateResponse.ok) {
                throw new Error('Failed to update old bed status');
            }
    
            setSipSuccess('Patient transferred successfully');
            
            // Refresh ward data
            const wardsResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
            const updatedWards = await wardsResponse.json();
            setWards(updatedWards);
    
            setTimeout(() => {
                closeOffcanvas();
            }, 2000);
    
        } catch (error) {
            console.error('Error in SIP Out:', error);
            setSipError(error.message || 'Failed to process SIP Out');
        }
    };

    const handleDeath = async (e) => {
        e.preventDefault();
        const hosp_ID = localStorage.getItem('hosp_ID');
    
        try {
            const formData = new FormData();
            formData.append('death_certificate', e.target.death_certificate.files[0]);
            formData.append('death_date', e.target.death_date.value);
            formData.append('bed_id', modalData.bedNumber);
    
            const deathRecordResponse = await fetch(`http://127.0.0.1:8000/bed_management/death-record/${hosp_ID}/`, {
                method: 'POST',
                body: formData
            });
    
            if (!deathRecordResponse.ok) {
                const errorData = await deathRecordResponse.json();
                throw new Error(errorData.error || 'Failed to create death record');
            }
    
            // Refresh ward data
            const wardsResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
            const updatedWards = await wardsResponse.json();
            setWards(updatedWards);
    
            closeOffcanvas();
            alert('Death record created successfully');
    
        } catch (error) {
            console.error('Error processing death record:', error);
            alert('Failed to process death record: ' + error.message);
        }
    };

    const filteredWards = wards?.filter(ward =>
        ward.ward_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

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
                    <Link to="/admin/bedNo">
                        <button className="bedNo-activity">
                            MANAGE REQUEST
                        </button>
                    </Link>
                    {/* <Link to="/admin/bedlist">
                        <button className="bedNo-activity">BED LIST</button>
                    </Link> */}
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
                        <div key={ward.ward}>
                            <div className="manageBed-ward-header">
                                <h3>{ward.ward_name}</h3>
                                <div className="manageBed-ward-actions">
                                    <button 
                                        className="manageBed-add-bed-btn"
                                        disabled={isLoading[ward.ward]}
                                        onClick={() => handleAddBed(ward)}
                                    >
                                    {isLoading[ward.ward] ? 'Adding...' : 'Add Bed'}
                                    </button>
                                </div>
                            </div>
                            <div className="manageBed-beds">
                                {ward.beds?.map((bed) => (
                                    <div key={bed.id} className="manageBed-bed-container">
                                        <div
                                            className={`manageBed-bed manageBed-${bed.status}`}
                                            onClick={() => handleBedClick(bed, ward.ward_name, ward.ward)} // Updated here
                                        >
                                            BED {bed.id}
                                            <br />
                                            {bed.status.charAt(0).toUpperCase() + bed.status.slice(1)}
                                        </div>
                                        <button 
                                            className="manageBed-delete-bed-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteBed(bed.id, ward);
                                            }}
                                        >
                                            Delete
                                        </button>
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

                    {isOffcanvasOpen && (
                        <div className="manageBed-offcanvas">
                            <div className="manageBed-offcanvas-content">
                                <span className="manageBed-offcanvas-close" onClick={closeOffcanvas}>
                                    &times;
                                </span>
                                <h2 className="manageBed-offcanvas-title">
                                    {offcanvasAction === 'vacant' ? 'Vacant Bed' : 'Occupied Bed'}
                                </h2>
                                {offcanvasAction === 'occupied' && (
                                    <>
                                        <form onSubmit={handlePatientAdmission}>
                                            <h4>Patient Admission</h4>
                                            <input 
                                                type="text" 
                                                placeholder="Patient Name" 
                                                value={admissionData.patientName}
                                                onChange={(e) => setAdmissionData(prev => ({
                                                    ...prev,
                                                    patientName: e.target.value
                                                }))}
                                                required 
                                            />

                                            <select 
                                                value={admissionData.doctorName}
                                                onChange={(e) => setAdmissionData(prev => ({
                                                    ...prev,
                                                    doctorName: e.target.value
                                                }))}
                                                required
                                            >
                                                <option value="">Select Doctor</option>
                                                {doctors.map(doc => (
                                                    <option key={doc} value={doc}>{doc}</option>
                                                ))}
                                            </select>
                                            <input 
                                                type="file" 
                                                onChange={(e) => setAdmissionData(prev => ({
                                                    ...prev,
                                                    admissionLetter: e.target.files[0]
                                                }))}
                                                required 
                                            />
                                            <input 
                                                type="date"
                                                value={admissionData.admissionDate}
                                                onChange={(e) => setAdmissionData(prev => ({
                                                    ...prev,
                                                    admissionDate: e.target.value
                                                }))}
                                                required 
                                            />
                                            <button type="submit">Submit Admission</button>
                                        </form>
                                        <br />
                                        {/* <form onSubmit={handleSIPIn}>
                                        <h4>SIP In</h4>
                                        <select 
                                            value={department}
                                            onChange={(e) => setDepartment(e.target.value)}
                                            
                                        >
                                            <option value="">Select Ward</option>
                                            {wards.map(ward => (
                                                <option key={ward.ward} value={ward.ward_name}>
                                                    {ward.ward_name}
                                                </option>
                                            ))}
                                        </select>
                                        <button type="submit">Submit SIP In</button>
                                    </form> */}
                                    </>
                                )}

                                

                                {offcanvasAction === 'vacant' && (
                                    <div className="p-4 space-y-4">
                                        {/* Discharge Form */}
                                        <form onSubmit={handlePatientDischarge} className="mb-4">
                                            <h4 className="text-lg font-semibold mb-3">Patient Discharge</h4>
                                            <div className="space-y-3">
                                                <input 
                                                    type="file"
                                                    name="discharge_document"
                                                    accept=".pdf,.doc,.docx"
                                                    className="w-full p-2 border rounded"
                                                    placeholder="Discharge Document"
                                                    required
                                                />
                                                <input 
                                                    type="date"
                                                    name="discharge_date"
                                                    className="w-full p-2 border rounded"
                                                    required
                                                />
                                                <button 
                                                    type="submit"
                                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                                >
                                                    Submit Discharge
                                                </button>
                                            </div>
                                        </form>

                                        {/* SIP Out Form */}
                                        <form onSubmit={handleSIPOut} className="mb-4">
                                            <h4 className="text-lg font-semibold mb-3">SIP Out</h4>
                                            
                                            {sipError && (
                                                <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                                                    {sipError}
                                                </div>
                                            )}
                                            
                                            {sipSuccess && (
                                                <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
                                                    {sipSuccess}
                                                </div>
                                            )}

                                            <div className="space-y-3">
                                                <select 
                                                    value={department}
                                                    onChange={(e) => setDepartment(e.target.value)}
                                                    className="w-full p-2 border rounded"
                                                    required
                                                >
                                                    <option value="">Select Ward</option>
                                                    {wards.map(ward => (
                                                        <option key={ward.ward} value={ward.ward}>
                                                            {ward.ward_name} ({ward.beds.filter(b => b.status === 'vacant').length} vacant beds)
                                                        </option>
                                                    ))}
                                                </select>

                                                <input 
                                                    type="date"
                                                    value={sipDate}
                                                    onChange={(e) => setSipDate(e.target.value)}
                                                    className="w-full p-2 border rounded"
                                                    required
                                                />

                                                <button 
                                                    type="submit"
                                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                                >
                                                    Submit SIP Out
                                                </button>
                                            </div>
                                        </form>

                                        {/* Death Record Form */}
                                        <form onSubmit={handleDeath} className="mb-4">
                                            <h4 className="text-lg font-semibold mb-3">Patient Death Record</h4>
                                            <div className="space-y-3">
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Date of Death
                                                    </label>
                                                    <input 
                                                        type="date"
                                                        name="death_date"
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>
                                                
                                                <div className="space-y-2">
                                                    <label className="block text-sm font-medium text-gray-700">
                                                        Death Certificate
                                                    </label>
                                                    <input 
                                                        type="file"
                                                        name="death_certificate"
                                                        accept=".pdf,.doc,.docx"
                                                        className="w-full p-2 border rounded"
                                                        required
                                                    />
                                                </div>

                                                <button 
                                                    type="submit"
                                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                                                >
                                                    Submit Death Record
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
