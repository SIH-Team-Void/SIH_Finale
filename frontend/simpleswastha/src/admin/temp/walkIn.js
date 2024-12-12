import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';

const WalkIn = () => {
  const [doctors, setDoctors] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    patientId: '',
    patientName: '',
    selectedDoctor: '',
    selectedDate: new Date().toISOString().split('T')[0]
  });
  const [error, setError] = useState('');

  // Fetch doctors from API
  useEffect(() => {
    fetch('http://localhost:8000/api/doctors/?fetch_all=true')
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        setAllDoctors(data);
        setFilteredDoctors(data);
        const uniqueDepartments = [...new Set(data.map((doctor) => doctor.department))];
        setDepartments(['All', ...uniqueDepartments]);
      })
      .catch((error) => console.error('Error fetching doctors:', error));
  }, []);
  
  // Modify department filtering logic
  useEffect(() => {
    if (selectedDepartment && selectedDepartment !== 'All') {
      const filtered = allDoctors.filter((doctor) => doctor.department === selectedDepartment);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(allDoctors);
    }
  }, [selectedDepartment, allDoctors]);

  // Handle input changes for the form
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError('');
  };


// Handle form submission with debugging
const handleAddPatient = async (e) => {
  e.preventDefault();

  if (!formData.patientName || !formData.selectedDoctor) {
    setError('Please fill in all required fields');
    return;
  }

  const payload = {
    doctor_id: formData.selectedDoctor,
    patient_name: formData.patientName,
  };

  console.log('Adding patient with payload:', payload); // Debugging payload

  try {
    const response = await fetch('http://localhost:8000/api/walkin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error response from server:', data); // Debugging response
      setError(data.error);
      return;
    }

    console.log('Successfully added patient:', data); // Debugging success response

    // Clear form and refresh patient list
    setFormData((prev) => ({
      ...prev,
      patientName: '',
      selectedDoctor: '',
    }));

    // Refresh the patient list
    fetchPatients(formData.selectedDoctor);
  } catch (error) {
    console.error('Failed to add patient:', error);
    setError('Failed to add patient');
  }
};

// Debugging URL and parameters in fetchPatients
const fetchPatients = async (doctorId = 'all') => {
  try {
    let url = 'http://localhost:8000/api/walkin/';
    if (doctorId !== 'all') {
      url += `?doctor_id=${doctorId}`;
    } else {
      url += '?fetch_all=true';
    }

    console.log('Fetching patients with URL:', url); // Debugging URL

    const response = await fetch(url);
    const data = await response.json();

    console.log('Patients fetched:', data); // Debugging response data

    setPatients(data.walkins || []);
  } catch (error) {
    console.error('Error fetching patients:', error);
  }
};

  

  // Effect to fetch patients when doctor selection changes
  useEffect(() => {
    if (formData.selectedDoctor) {
      fetchPatients(formData.selectedDoctor);
    }
  }, [formData.selectedDoctor]);

  return (
    <div className="opdSc-body">
      <Navbar />
      <div className="opdSc-options">
        <Link to="/admin/opdSc" className="drSc-activity">
          Manage Existing Schedule
        </Link>
        <Link to="/admin/drSc" className="drSc-activity">
          Create New Doctor Schedule
        </Link>
        <Link to="/admin/walkIn" className="drSc-activity">
          Manage Walk-in
        </Link>
      </div>

      <div className="storage-forminputs" id="formContent">
        <div className="storage-form-row">
          <div className="storage-form-group">
            <label htmlFor="date">Select Date</label>
            <input
              type="date"
              id="selectedDate"
              value={formData.selectedDate}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          
          <div className="storage-form-group">
            <label htmlFor="doctor">Select Doctor</label>
            <select
              id="selectedDoctor"
              className="form-control"
              value={formData.selectedDoctor}
              onChange={handleInputChange}
            >
              <option value="">Select Doctor</option>
              <option value="all">All Doctors</option>
              {filteredDoctors.map((doctor) => (
                <option key={doctor.doctor_id} value={doctor.doctor_id}>
                  Dr. {doctor.doctor_name}
                </option>
              ))}
            </select>
          </div>

          <div className="storage-form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="form-control"
            >
              <option value="">Select Department</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleAddPatient}>
          <label>Add Patient</label>
          <div className="storage-form-row">
            {/* <div className="storage-form-group">
              <label htmlFor="patientId">Patient ID (Optional)</label>
              <input
                type="text"
                id="patientId"
                value={formData.patientId}
                onChange={handleInputChange}
                placeholder="Patient ID"
                className="form-control"
              />
            </div> */}
            
            <div className="storage-form-group">
              <label htmlFor="patientName">Patient Name</label>
              <input
                type="text"
                id="patientName"
                value={formData.patientName}
                onChange={handleInputChange}
                placeholder="Patient Name"
                className="form-control"
                required
              />
            </div>

            <div className="storage-form-group">
              <label htmlFor="selectedDoctor">Select Doctor</label>
              <select
                id="selectedDoctor"
                value={formData.selectedDoctor}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select Doctor</option>
                {filteredDoctors.map((doctor) => (
                  <option key={doctor.doctor_id} value={doctor.doctor_id}>
                    Dr. {doctor.doctor_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="storage-save">
            Add Patient
          </button>
        </form>

        <div>
          <label>Walk-In Patients</label>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Patient Name</th>
                  <th>Doctor Name</th>
                  <th>Token Number</th>
                </tr>
              </thead>
              <tbody>
                {patients && patients.length > 0 ? (
                  patients.map((patient) => (
                    <tr key={patient.walkin_id}>
                      <td>{patient.date}</td>
                      <td>{patient.patient_name}</td>
                      <td>{patient.doctor_name}</td>
                      <td>{patient.token_number}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No patients found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalkIn;