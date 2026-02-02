import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Page5.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaChevronRight, FaBuilding, FaUserTie, FaArrowRight } from "react-icons/fa";

const Page5 = () => {
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [compRes, roleRes] = await Promise.all([
          axios.get("http://localhost:5000/api/companies"),
          axios.get("http://localhost:5000/api/jobs/roles")
        ]);
        setCompanies(compRes.data || []);
        setRoles(roleRes.data || []);
      } catch (err) {
        console.error("Failed to load data", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container my-5 px-4 px-md-2">
      <div className="row g-4 justify-content-center">
        
        {/* Left Illustration - Hidden on mobile to save space, or shown centered */}
        <div className="col-12 col-lg-4">
          <div className="illustration-box p-4 rounded-4 text-center text-lg-start h-100 d-flex flex-column justify-content-center border-0" style={{ background: '#c1cff3' }}>
            <h4 className="mb-3 fw-bold text-dark text-center">
              PREPARE FOR YOUR NEXT INTERVIEW
            </h4>
            <img
              src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg"
              className="img-fluid mx-auto"
              alt="Interview illustration"
              style={{ maxWidth: "200px" , borderRadius:"10px"}}
            />
          </div>
        </div>

        {/* Companies Card */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="shadow-sm interview-card rounded-4 p-4 h-100 border">
            <div className="d-flex align-items-center gap-2 mb-4">
              <FaBuilding className="text-primary" />
              <h6 className="fw-bold mb-0">Interview questions by company</h6>
            </div>

            <div className="scroll-list custom-scrollbar" style={{ maxHeight: "350px", overflowY: "auto" }}>
              {companies.map((company, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center py-3 border-bottom company-row">
                  <div className="d-flex gap-3 align-items-center">
                    <img src={company.logo} alt="" className="rounded-circle" style={{ width: "32px", height: "32px", objectFit: "contain" }} />
                    <span className="fw-semibold text-secondary">{company.name}</span>
                  </div>
                  <FaChevronRight className="text-primary small" />
                </div>
              ))}
            </div>

            <Link className="d-flex align-items-center gap-2 text-primary mt-4 small fw-bold text-decoration-none hover-link" to="/companies">
              View all companies <FaArrowRight fontSize="12px" />
            </Link>
          </div>
        </div>

        {/* Roles Card */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="shadow-sm interview-card rounded-4 p-4 h-100 border">
            <div className="d-flex align-items-center gap-2 mb-4">
              <FaUserTie className="text-primary" />
              <h6 className="fw-bold mb-0">Interview questions by role</h6>
            </div>

            <div className="scroll-list custom-scrollbar" style={{ maxHeight: "350px", overflowY: "auto" }}>
              {roles.map((role, index) => (
                <div key={index} className="d-flex justify-content-between align-items-center py-3 border-bottom role-row">
                  <span className="fw-semibold text-secondary">{role}</span>
                  <FaChevronRight className="text-primary small" />
                </div>
              ))}
            </div>

            <Link className="d-flex align-items-center gap-2 text-primary mt-4 small fw-bold text-decoration-none hover-link" to="/roles">
              View all roles <FaArrowRight fontSize="12px" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Page5;