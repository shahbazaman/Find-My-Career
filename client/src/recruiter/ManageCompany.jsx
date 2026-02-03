import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added missing import
import {
  BsEnvelope,
  BsGeoAlt,
  BsBuilding,
  BsPencilSquare
} from "react-icons/bs";
import MyJobs from "./MyJobs";
import Applicants from "./Applicants";

// Note: If you use a library like react-toastify, ensure it's imported. 
// Otherwise, I've used a standard alert fallback below.

export default function ManageCompany() {
  const navigate = useNavigate(); // Initialize navigation
  const [company, setCompany] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCompany();
    // eslint-disable-next-line
  }, []);

  /* ================= FETCH COMPANY PROFILE ================= */
const fetchCompany = async () => {
    try {
      const res = await axios.get("${import.meta.env.VITE_API_BASE_URL}/companies/me/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompany(res.data);
    } catch (err) {
      // 404 means the recruiter has NEVER created a company profile
      if (err.response && err.response.status === 404) {
        console.log("No company profile found. Redirecting to setup...");
        navigate("/CompanyProfileForm"); // Redirect to your recruiter form page
      } else {
        console.error("FETCH ERROR:", err);
      }
    }
  };

  if (!company) {
    return (
      <div style={{ minHeight: "100vh", background: "#060729ff", padding: 40 }}>
        <h2 style={{ color: "white" }}>Loading company profile...</h2>
      </div>
    );
  }

  /* ================= PROFILE COMPLETION ================= */
  const completionFields = [
    company.logo,
    company.companyName,
    company.email,
    company.location,
    company.industry,
    company.description
  ];

  const progress = Math.round(
    (completionFields.filter(Boolean).length /
      completionFields.length) *
      100
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
        padding: "30px"
      }}
    >
      {/* ================= PROFILE COMPLETION ================= */}
      <div style={glassCard}>
        <h3 style={{ color: "white", marginBottom: 15 }}>Profile Completion</h3>
        <div
          style={{
            background: "#334155",
            borderRadius: 10,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: 14,
              background: "linear-gradient(90deg,#667eea,#764ba2)",
              transition: "width 0.6s ease"
            }}
          />
        </div>
        <p style={{ color: "#cbd5f5", marginTop: 8 }}>
          {progress}% Complete
        </p>
      </div>

      {/* ================= COMPANY HEADER ================= */}
      <div
        style={{
          ...glassCard,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <img
            src={company.logo || "https://via.placeholder.com/90"}
            alt="company-logo"
            style={{ width: 90, height: 90, borderRadius: 18, objectFit: "cover" }}
          />
          <div>
            <h2 style={{ color: "white", margin: 0 }}>{company.companyName}</h2>
            <p style={{ color: "#94a3b8", margin: "5px 0 0" }}>{company.industry}</p>
          </div>
        </div>

        <button 
          onClick={() => navigate("/CompanyProfileForm")} 
          style={editBtn}
        >
          <BsPencilSquare /> Edit Profile
        </button>
      </div>

      {/* ================= INFO CARDS ================= */}
      <div style={grid3}>
        <InfoCard
          icon={<BsEnvelope />}
          label="Email"
          value={company.email || "Not added"}
        />
        <InfoCard
          icon={<BsGeoAlt />}
          label="Location"
          value={company.location || "Not added"}
        />
        <InfoCard
          icon={<BsBuilding />}
          label="Industry"
          value={company.industry || "Not added"}
        />
      </div>

      {/* ================= ABOUT ================= */}
      <div style={glassCard}>
        <h3 style={{ color: "white", marginBottom: 10 }}>About Company</h3>
        <p style={{ color: "#cbd5f5", lineHeight: 1.6 }}>
          {company.description || "No description added"}
        </p>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

const InfoCard = ({ icon, label, value }) => (
  <div style={glassCard}>
    <div style={{ fontSize: 26, color: "white" }}>{icon}</div>
    <p style={{ color: "#94a3b8", margin: "8px 0 4px" }}>{label}</p>
    <h4 style={{ color: "white", margin: 0 }}>{value}</h4>
  </div>
);

/* ================= STYLES ================= */

const glassCard = {
  background: "rgba(255, 255, 255, 0.06)",
  padding: 25,
  borderRadius: 20,
  border: "1px solid rgba(255,255,255,0.1)",
  marginBottom: 25
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
  gap: 20,
  marginBottom: 25
};

const editBtn = {
  background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  color: "white",
  padding: "10px 18px",
  borderRadius: 12,
  display: "flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  transition: "0.3s ease"
};