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
import Storage from './admin/temp/storage';
import Sales from './admin/temp/sales';
import WalkIn from './admin/temp/walkIn';
import Vaim from './admin/temp/vaim';
import Edit from './admin/temp/dispension';
import DrSc from './admin/temp/drSc';
// import BedList from './admin/temp/bedlist';
import BedNoti from './admin/temp/bedNo';
import Inventory from './admin/temp/inventory';
import UserLogin from './user/temp/userLogin';
import UserHome from './user/temp/userHome';
import UserBedBook from './user/temp/bedBook';
import UserBedCat from './user/temp/bedCat';
import UserOPD from './user/temp/opd';
import UserSignUp from './user/temp/signUp';
import UserOPDDr from './user/temp/opdDr';
import UserOPDDrSc from './user/temp/opdDrSc';
import UserAccount from './user/temp/userAccount';
import UserGoverSc from './user/temp/govermentSc';
import GovernmentHome from './goverment/temp/goveHome';
import GovernmentMap from './goverment/temp/goveMap';
import GovernmentSc from './goverment/temp/goveSc';

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
          <Route path="/admin/bedNo" element={<BedNoti />} />
          <Route path="/admin/inventory/storage" element={<Storage />} />
          <Route path="/admin/inventory/sales" element={<Sales />} />
          <Route path="/admin/inventory/vaim" element={<Vaim />} />
          <Route path="/admin/inventory/dispension" element={<Edit />} />
          {/* <Route path="/admin/bedlist" element={<BedList />} /> */}
          <Route path="/admin/walkIn" element={<WalkIn />} />

          {/* User Portal */}
          <Route path="/user" element={<UserLogin />} />
          <Route path="/user/Home" element={<UserHome />} />
          <Route path="/user/bedBook" element={<UserBedBook />} />
          <Route path="/user/bedCat" element={<UserBedCat />} />
          <Route path="/user/opd" element={<UserOPD />} />
          <Route path="/user/opdDr" element={<UserOPDDr />} />
          <Route path="/user/opdDrSc" element={<UserOPDDrSc />} />
          <Route path="/user/userAccount" element={<UserAccount />} />
          <Route path="/user/govermentSc" element={<UserGoverSc />} />
          <Route path="/user/signup" element={<UserSignUp />} />

          {/* Government Portal */}
          <Route path="/government" element={<GovernmentHome />} />
          <Route path="/government/map" element={<GovernmentMap />} />
          <Route path="/government/schemes" element={<GovernmentSc />} />

          {/* Catch-All Route */}
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
