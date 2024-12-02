import React from 'react'
import { Link } from 'react-router-dom';
import Navbar from '../component/navbar';
import '../css/bedNo.css';

export default function bedNo() {
  return (
    <div className='bedNo-body'>
      < Navbar/>
      <div className="bedNo-options">
          <Link to="/admin/addBed">
          <button className="bedNo-activity" >
            ADD OR CREATE WARD DETAILS
            </button>
            </Link>
          <Link to="/admin/manageBed"> <button className="bedNo-activity"> MANAGE BEDS
            </button></Link>
            <Link to="/admin/bedNo"> <button className="bedNo-activity"> MANAGE REQUEST
            </button></Link>
        </div>
        <div className="bedNo-requests">
            <div className="bedNo-request">
                <div className="bedNo-info">
                    <h4>Request no. 1</h4>
                    <p>Ward detail: General ward</p>
                    <p>Patient Name: Ashwin Vidhva</p>
                    <a href="#" className="bedNo-view-doc">View Document</a>
                </div>
                <div className="bedNo-actions">
                    <button className="bedNo-disapprove">Disapprove</button>
                    <button className="bedNo-approve">Approve</button>
                </div>
            </div>

            <div className="bedNo-request">
                <div className="bedNo-info">
                    <h4>Request no. 2</h4>
                    <p>Ward detail: General ward</p>
                    <p>Patient Name: Ashwin Vidhva</p>
                    <a href="#" className="bedNo-view-doc">View Document</a>
                </div>
                <div className="bedNo-actions">
                    <button className="bedNo-disapprove">Disapprove</button>
                    <button className="bedNo-approve">Approve</button>
                </div>
            </div>
        </div>
    </div>
  )
}
