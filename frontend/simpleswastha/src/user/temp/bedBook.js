// import React from 'react';
// import "../css/bedBook.css";
// import { Link } from 'react-router-dom';
// import Navbar from '../userComponents/userNavbar';
// import SearchIcon from '../img/search.png';
// import RajaImage from '../img/raja.png';
// import CritiImage from '../img/criti.png';
// import VedantImage from '../img/vedant.png';
// import GodrejImage from '../img/godreg.png';
// import SuranaImage from '../img/surana.png';

// export default function BedBook() {
//   return (
//     <div className="bedBook-body">
//       <Navbar />
//       <section>
//         <b className="bedBook-titles">Select Hospitals</b>
//         <div className="bedBook-lowerSection">
//           <div className="bedBook-search">
//             <img src={SearchIcon} alt="Search Icon" />
//             <div className="bedBook-search-bar">
//               <input type="text" placeholder="Search By Hospital's Name" />
//             </div>
//           </div>
//           <div className="bedBook-hospital-list">
//             <div className="bedBook-hospital-card">
//               <img src={RajaImage} alt="Rajawadi Hospital" />
//               <div className="bedBook-hospital-info">
//                 <h3>Rajawadi Hospital</h3>
//                 <p>3, 7th Rd, Rajawadi Colony, Ghatkopar East, Mumbai, Maharashtra 400077</p>
//                 <div className="bedBook-btns">
//                 <Link to="/user/bedCat">
//                     <button className="bedBook-btn">See Available Beds</button>
//                 </Link>
//                   <button className="bedBook-emergency">Emergency Call</button>
//                 </div>
//               </div>
//             </div>
//             <div className="bedBook-hospital-card">
//               <img src={CritiImage} alt="CritiCare Asia Multi Specialty Hospital" />
//               <div className="bedBook-hospital-info">
//                 <h3>CritiCare Asia Multi Specialty Hospital</h3>
//                 <p>Building No 1, Kirol Road, Kirol Rd, off Lal Bahadur Shastri Marg, near Kohinoor International School, Ali Yavar Jung, Kurla West, Kurla, Mumbai, Maharashtra 400070</p>
//                 <div className="bedBook-btns">
//                   <a href="BedCat.php">
//                     <button className="bedBook-btn">See Available Beds</button>
//                   </a>
//                   <button className="bedBook-emergency">Emergency Call</button>
//                 </div>
//               </div>
//             </div>
//             <div className="bedBook-hospital-card">
//               <img src={VedantImage} alt="Vedant Central Hospital" />
//               <div className="bedBook-hospital-info">
//                 <h3>Vedant Central Hospital</h3>
//                 <p>Pasaydan Bhavan, R.B. Kadam Marg, Near Jagruti Nagar Metro Station Wagadwala, Jivdaya Ln, next to Jain Temple in, Ghatkopar West, Mumbai, Maharashtra 400084</p>
//                 <div className="bedBook-btns">
//                   <a href="BedCat.php">
//                     <button className="bedBook-btn">See Available Beds</button>
//                   </a>
//                   <button className="bedBook-emergency">Emergency Call</button>
//                 </div>
//               </div>
//             </div>
//             <div className="bedBook-hospital-card">
//               <img src={GodrejImage} alt="Godrej Memorial Hospital" />
//               <div className="bedBook-hospital-info">
//                 <h3>Godrej Memorial Hospital</h3>
//                 <p>Opposite Godrej Platinum, Eastern Express Hwy, Vikhroli, Mumbai, Maharashtra 400079</p>
//                 <div className="bedBook-btns">
//                   <a href="BedCat.php">
//                     <button className="bedBook-btn">See Available Beds</button>
//                   </a>
//                   <button className="bedBook-emergency">Emergency Call</button>
//                 </div>
//               </div>
//             </div>
//             <div className="bedBook-hospital-card">
//               <img src={SuranaImage} alt="Surana Sethia Hospital" />
//               <div className="bedBook-hospital-info">
//                 <h3>Surana Sethia Hospital</h3>
//                 <p>Sion - Trombay Rd, Suman Nagar, Chembur, Mumbai, Maharashtra 400071</p>
//                 <div className="bedBook-btns">
//                   <a href="BedCat.php">
//                     <button className="bedBook-btn">See Available Beds</button>
//                   </a>
//                   <button className="bedBook-emergency">Emergency Call</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import "../css/bedBook.css";
// import { Link } from 'react-router-dom';
// import Navbar from '../userComponents/userNavbar';
// import SearchIcon from '../img/search.png';
// import RajaImage from '../img/raja.png';
// import CritiImage from '../img/criti.png';
// import VedantImage from '../img/vedant.png';
// import GodrejImage from '../img/godreg.png';
// import SuranaImage from '../img/surana.png';

// export default function BedBook() {
//   const [hospitals, setHospitals] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchHospitals();
//   }, []);

//   const fetchHospitals = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/api/hospital/register/');
//       if (response.ok) {
//         const data = await response.json();
//         setHospitals(data);
//       }
//     } catch (error) {
//       console.error('Error fetching hospitals:', error);
//     }
//   };

//   // Fallback hospital images array
//   const defaultImages = [RajaImage, CritiImage, VedantImage, GodrejImage, SuranaImage];

//   // If no hospitals are fetched, show the default static list
//   const displayHospitals = hospitals.length > 0 ? hospitals : [
//     {
//       hosp_ID: 1,
//       hosp_name: "Rajawadi Hospital",
//       hosp_address: "3, 7th Rd, Rajawadi Colony, Ghatkopar East, Mumbai, Maharashtra 400077",
//       image_url: RajaImage
//     },
//     {
//       hosp_ID: 2,
//       hosp_name: "CritiCare Asia Multi Specialty Hospital",
//       hosp_address: "Building No 1, Kirol Road, Kirol Rd, off Lal Bahadur Shastri Marg, near Kohinoor International School, Ali Yavar Jung, Kurla West, Kurla, Mumbai, Maharashtra 400070",
//       image_url: CritiImage
//     },
//     {
//       hosp_ID: 3,
//       hosp_name: "Vedant Central Hospital",
//       hosp_address: "Pasaydan Bhavan, R.B. Kadam Marg, Near Jagruti Nagar Metro Station Wagadwala, Jivdaya Ln, next to Jain Temple in, Ghatkopar West, Mumbai, Maharashtra 400084",
//       image_url: VedantImage
//     },
//     {
//       hosp_ID: 4,
//       hosp_name: "Godrej Memorial Hospital",
//       hosp_address: "Opposite Godrej Platinum, Eastern Express Hwy, Vikhroli, Mumbai, Maharashtra 400079",
//       image_url: GodrejImage
//     },
//     {
//       hosp_ID: 5,
//       hosp_name: "Surana Sethia Hospital",
//       hosp_address: "Sion - Trombay Rd, Suman Nagar, Chembur, Mumbai, Maharashtra 400071",
//       image_url: SuranaImage
//     }
//   ];

//   const filteredHospitals = displayHospitals.filter(hospital =>
//     hospital.hosp_name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="bedBook-body">
//       <Navbar />
//       <section>
//         <b className="bedBook-titles">Select Hospitals</b>
//         <div className="bedBook-lowerSection">
//           <div className="bedBook-search">
//             <img src={SearchIcon} alt="Search Icon" />
//             <div className="bedBook-search-bar">
//               <input 
//                 type="text" 
//                 placeholder="Search By Hospital's Name" 
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="bedBook-hospital-list">
//             {filteredHospitals.map((hospital, index) => (
//               <div key={hospital.hosp_ID} className="bedBook-hospital-card">
//                 <img 
//                   src={hospital.image_url || defaultImages[index % defaultImages.length]} 
//                   alt={hospital.hosp_name}
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = defaultImages[index % defaultImages.length];
//                   }}
//                 />
//                 <div className="bedBook-hospital-info">
//                   <h3>{hospital.hosp_name}</h3>
//                   <p>{hospital.hosp_address}</p>
//                   <div className="bedBook-btns">
//                     <Link to={`/user/bedCat/${hospital.hosp_ID}`}>
//                       <button className="bedBook-btn">See Available Beds</button>
//                     </Link>
//                     <button 
//                       className="bedBook-emergency"
//                       onClick={() => 
//                         hospital.hosp_contact_no && 
//                         (window.location.href = `tel:${hospital.hosp_contact_no}`)
//                       }
//                     >
//                       Emergency Call
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import "../css/bedBook.css";
import { Link } from 'react-router-dom';
import Navbar from '../userComponents/userNavbar';
import SearchIcon from '../img/search.png';
import RajaImage from '../img/raja.png';
import CritiImage from '../img/criti.png';
import VedantImage from '../img/vedant.png';
import GodrejImage from '../img/godreg.png';
import SuranaImage from '../img/surana.png';

const BACKEND_URL = 'http://localhost:8000';

export default function BedBook() {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/hospital/register/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch hospitals');
      }

      const data = await response.json();
      setHospitals(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      setError('Failed to load hospitals');
    } finally {
      setLoading(false);
    }
  };

  // Fallback hospital images array
  const defaultImages = [RajaImage, CritiImage, VedantImage, GodrejImage, SuranaImage];

  // If no hospitals are fetched, show the default static list
  const displayHospitals = hospitals.length > 0 ? hospitals : [
    {
      hosp_ID: 1,
      hosp_name: "Rajawadi Hospital",
      hosp_address: "3, 7th Rd, Rajawadi Colony, Ghatkopar East, Mumbai, Maharashtra 400077",
      image_url: RajaImage,
      hosp_contact_no: "+91-123-456-7890"
    },
    {
      hosp_ID: 2,
      hosp_name: "CritiCare Asia Multi Specialty Hospital",
      hosp_address: "Building No 1, Kirol Road, Kirol Rd, off Lal Bahadur Shastri Marg, near Kohinoor International School, Ali Yavar Jung, Kurla West, Kurla, Mumbai, Maharashtra 400070",
      image_url: CritiImage,
      hosp_contact_no: "+91-123-456-7891"
    },
    {
      hosp_ID: 3,
      hosp_name: "Vedant Central Hospital",
      hosp_address: "Pasaydan Bhavan, R.B. Kadam Marg, Near Jagruti Nagar Metro Station Wagadwala, Jivdaya Ln, next to Jain Temple in, Ghatkopar West, Mumbai, Maharashtra 400084",
      image_url: VedantImage,
      hosp_contact_no: "+91-123-456-7892"
    },
    {
      hosp_ID: 4,
      hosp_name: "Godrej Memorial Hospital",
      hosp_address: "Opposite Godrej Platinum, Eastern Express Hwy, Vikhroli, Mumbai, Maharashtra 400079",
      image_url: GodrejImage,
      hosp_contact_no: "+91-123-456-7893"
    },
    {
      hosp_ID: 5,
      hosp_name: "Surana Sethia Hospital",
      hosp_address: "Sion - Trombay Rd, Suman Nagar, Chembur, Mumbai, Maharashtra 400071",
      image_url: SuranaImage,
      hosp_contact_no: "+91-123-456-7894"
    }
  ];

  const filteredHospitals = displayHospitals.filter(hospital =>
    hospital.hosp_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && hospitals.length === 0) {
    return (
      <div className="bedBook-body">
        <Navbar />
        <section>
          <div className="bedBook-titles">Loading hospitals...</div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bedBook-body">
        <Navbar />
        <section>
          <div className="bedBook-titles">Failed to load hospitals. Using default list.</div>
        </section>
      </div>
    );
  }

  return (
    <div className="bedBook-body">
      <Navbar />
      <section>
        <b className="bedBook-titles">Select Hospitals</b>
        <div className="bedBook-lowerSection">
          <div className="bedBook-search">
            <img src={SearchIcon} alt="Search Icon" />
            <div className="bedBook-search-bar">
              <input 
                type="text" 
                placeholder="Search By Hospital's Name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="bedBook-hospital-list">
            {filteredHospitals.map((hospital, index) => (
              <div key={hospital.hosp_ID} className="bedBook-hospital-card">
                <img 
                  src={hospital.image_url || defaultImages[index % defaultImages.length]} 
                  alt={hospital.hosp_name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImages[index % defaultImages.length];
                  }}
                />
                <div className="bedBook-hospital-info">
                  <h3>{hospital.hosp_name}</h3>
                  <p>{hospital.hosp_address}</p>
                  <div className="bedBook-btns">
                    <Link to={`/user/bedCat/${hospital.hosp_ID}`}>
                      <button className="bedBook-btn">See Available Beds</button>
                    </Link>
                    <button 
                      className="bedBook-emergency"
                      onClick={() => 
                        hospital.hosp_contact_no && 
                        (window.location.href = `tel:${hospital.hosp_contact_no}`)
                      }
                    >
                      Emergency Call
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredHospitals.length === 0 && searchTerm && (
              <div className="bedBook-no-results">
                No hospitals found matching "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}