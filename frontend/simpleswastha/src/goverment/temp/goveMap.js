import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import '../css/goveMap.css';
import logo from "../img/nav_logo.png"
import Navbar from '../goverComponents/goveNav';

const HospitalsMap = () => {
  const [hospitals, setHospitals] = useState([]);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {

    if (mapRef.current && !mapInstanceRef.current) {
      const mapInstance = L.map(mapRef.current).setView([20.5937, 78.9629], 5);  // Center the map on India
      
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapInstance);
      
      mapInstanceRef.current = mapInstance;
    }

    const hospitalsData = [
      { 
        name: 'City Hospital', lat: 19.0760, lng: 72.8777, contact: '123-456-7890', address: 'Mumbai, Maharashtra' 
      },
      { 
        name: 'Global Care Hospital', lat: 28.7041, lng: 77.1025, contact: '098-765-4321', address: 'Delhi, India' 
      }
    ];
    setHospitals(hospitalsData);

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  const handleSearchLocation = () => {
    if (!latitude || !longitude || isNaN(parseFloat(latitude)) || isNaN(parseFloat(longitude))) {
      alert('Please enter valid latitude and longitude.');
      return;
    }

    // Additional check to ensure map is initialized
    if (!mapInstanceRef.current) {
      console.error('Map not initialized');
      return;
    }

    // Remove existing markers
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });

    const parsedLat = parseFloat(latitude);
    const parsedLng = parseFloat(longitude);

    mapInstanceRef.current.setView([parsedLat, parsedLng], 13);

    // Add a blue marker for the searched location
    L.marker([parsedLat, parsedLng], {
      icon: L.icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })
    }).addTo(mapInstanceRef.current).bindPopup('Searched location').openPopup();

    // Ensure hospitals data is available before calling .map()
    if (Array.isArray(hospitals) && hospitals.length > 0) {
      const hospitalsWithDistance = hospitals.map((hospital) => ({
        ...hospital,
        distance: calculateDistance(parsedLat, parsedLng, hospital.lat, hospital.lng),
      }));

      // Sort hospitals by distance
      hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

      // Clear existing hospital cards and add the new ones
      const hospitalCards = document.getElementById('hospital-cards');
      hospitalCards.innerHTML = '';
      hospitalsWithDistance.forEach((hospital) => {
        // Add hospital marker
        L.marker([hospital.lat, hospital.lng], {
          icon: L.icon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          })
        }).addTo(mapInstanceRef.current).bindPopup(`${hospital.name}<br>${hospital.contact}<br>${hospital.address}`);

        // Create hospital card and append it to the list
        const card = document.createElement('div');
        card.classList.add('hospMap-hospital-card');
        card.innerHTML = `
          <h4>${hospital.name}</h4>
          <p>Contact: ${hospital.contact}</p>
          <p>Address: ${hospital.address}</p>
          <p>Distance: ${hospital.distance.toFixed(2)} km</p>
        `;
        hospitalCards.appendChild(card);
      });
    } else {
      console.error('Hospitals data is not available or not properly loaded.');
    }
  };

  // Function to calculate distance between two coordinates (Haversine formula)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div className="hospMap-container">
      <div className="hospMap-map-section">
        <div ref={mapRef} id="map" style={{height: '100%', width: '100%'}}></div>
      </div>
      <div className="hospMap-info-section">
        <div className="hospMap-logo">
        <img src={logo} alt="Simple Svastha" />
        </div>

        <div className="hospMap-search-form">
          <h3>Search by location</h3>
          <input
            type="text"
            id="latitude"
            placeholder="Enter latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
          <input
            type="text"
            id="longitude"
            placeholder="Enter longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
          <button id="search-location" onClick={handleSearchLocation}>
            Search Location
          </button>
        </div>

        <div className="hospMap-hospital-list">
          <h3>Hospitals list</h3>
          <div id="hospital-cards"></div>
        </div>
      </div>
    </div>
  );
};

export default HospitalsMap;