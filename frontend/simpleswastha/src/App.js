import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './welcome/wel';
import AdminLogin from './admin/temp/login';
import RegForm from './admin/temp/regForm';
import RegHome from './admin/temp/home';
import AddBed from './admin/temp/addBed';
import OPDSc from './admin/temp/opdSc';
import ManageBed from './admin/temp/manageBed';
import HospAccount from './admin/temp/account';
import DrSc from './admin/temp/drSc';
import Inventory from './admin/temp/inventory';
// import UserLogin from './user/temp/';
// import GovernmentHome from './goverment/temp/';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Welcome Page */}
          <Route path="/" element={<Welcome />} />

          {/* Admin Portal */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/register" element={<RegForm />} />
          <Route path="/admin/home" element={<RegHome />} />
          <Route path="/admin/addBed" element={<AddBed />} />
          <Route path="/admin/manageBed" element={<ManageBed />} />
          <Route path="/admin/drSc" element={<DrSc />} />
          <Route path="/admin/opdSc" element={<OPDSc />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/account" element={<HospAccount />} />

          {/* User Portal */}
          {/* <Route path="/user" element={<UserLogin />} /> */}

          {/* Government Portal */}
          {/* <Route path="/government" element={<GovernmentHome />} /> */}

          {/* Catch-All Route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
