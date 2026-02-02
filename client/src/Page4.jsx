import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Page4.css"; // optional for small styling tweaks
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="container mt-5 mb-5">
      <div className="banner-wrapper d-flex flex-column flex-md-row align-items-center justify-content-between p-4 rounded-4">
        
        {/* Left Image Section */}
        <div className="text-center text-md-start mb-4 mb-md-0">
          <img 
            src="https://img.freepik.com/free-photo/portrait-successful-business-team-isolated-white_155003-40395.jpg" 
            alt="Job"
            className="banner-img"
          />
        </div>

        {/* Right Text Section */}
        <div className="text-center text-md-start px-3">
          <span className="badge bg-light text-success fw-semibold px-3 py-2 mb-2 shadow-sm">
            FOR EMPLOYERS
          </span>
          <h2 className="fw-bold mt-3" style={{ color: "#065f46" }}>
            Want to hire?
          </h2>
          <p className="text-muted">
            Find the best candidates from thousands of active job seekers!
          </p>

          <button className="btn btn-outline-success px-4 py-2 fs-6 rounded-pill" onClick={()=> navigate('/addJobForm')}>
            Post Job →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
