import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/manageBed.css';

export default function ManageBed() {
    const [wards, setWards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({
        bedNumber: '',
        wardName: '',
        status: ''
    });

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

    const handleBedClick = (bed, wardName) => {
        setModalData({
            bedNumber: bed.id,
            wardName,
            status: bed.status,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleStatusChange = async (status) => {
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

            const wardsResponse = await fetch(`http://127.0.0.1:8000/bed_management/ward/list/${hosp_ID}/`);
            const updatedWards = await wardsResponse.json();
            setWards(updatedWards);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating bed status:', error);
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
                                {ward.beds?.map((bed) => (
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