import { FaRocket, FaBriefcase, FaCheckCircle, FaBuilding, FaCalendarDay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role || "guest";

  console.log("ROLE STATE >>>", `"${role}"`, typeof role);

  const scrollToJobs = () => {
    const el = document.getElementById("company-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const gotoForm = () => {
    navigate("/addJobForm");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
      padding: "60px 20px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        {/* ================= HERO SECTION ================= */}
        <div style={{ textAlign: "center" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
              padding: "12px 28px",
              borderRadius: "50px",
              color: "white",
              fontSize: "15px",
              fontWeight: "600",
              marginBottom: "30px",
              boxShadow: "0 8px 24px rgba(13, 110, 253, 0.3)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <FaRocket style={{ fontSize: "18px" }} />
            Over 100K+ Jobs Available
          </div>

          {/* ===== JOB SEEKER + GUEST HERO ===== */}
          {(role === "job seekers" || role === "guest") && (
            <div>
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  fontWeight: "900",
                  color: "#1a1a1a",
                  marginBottom: "24px",
                  lineHeight: "1.1",
                  letterSpacing: "-2px",
                }}
              >
                Find Your Dream Job
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  In Minutes
                </span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  color: "#6c757d",
                  lineHeight: "1.7",
                  marginBottom: "0",
                  maxWidth: "700px",
                  margin: "0 auto 40px",
                  fontWeight: "400",
                }}
              >
                Connect with top employers and discover opportunities that match
                your skills and aspirations
              </p>
            </div>
          )}

          {/* ===== RECRUITER HERO ===== */}
          {role === "recruiters" && (
            <div>
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 5rem)",
                  fontWeight: "900",
                  color: "#1a1a1a",
                  marginBottom: "24px",
                  lineHeight: "1.1",
                  letterSpacing: "-2px",
                }}
              >
                Find Your Dream Candidates
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  In Minutes
                </span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  color: "#6c757d",
                  lineHeight: "1.7",
                  marginBottom: "0",
                  maxWidth: "700px",
                  margin: "0 auto 40px",
                  fontWeight: "400",
                }}
              >
                Discover and engage with leading employers aligned with your
                career goals
              </p>
            </div>
          )}

          {/* ================= ROLE BASED BUTTONS ================= */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginTop: "40px",
            }}
          >
            <button
              onClick={role === "recruiters" ? gotoForm : scrollToJobs}
              style={{
                background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
                color: "white",
                border: "none",
                padding: "18px 48px",
                fontSize: "16px",
                fontWeight: "700",
                borderRadius: "12px",
                cursor: "pointer",
                boxShadow: "0 12px 28px rgba(13, 110, 253, 0.35)",
                transition: "all 0.3s ease",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 16px 32px rgba(13, 110, 253, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 12px 28px rgba(13, 110, 253, 0.35)";
              }}
            >
              {role === "recruiters" ? "ADD JOB" : "FIND JOB"}
            </button>
          </div>
        </div>

        {/* ================= STATS SECTION ================= */}
        {(role === "job seekers" || role === "guest") && (
         <div
  style={{
    display: "grid",
    /* Responsiveness: 
       Mobile: 1 column (if container < 450px)
       Tablet/Laptop: Automatically wraps based on available width
    */
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "1200px", // Prevents cards from getting too wide on Desktop
    margin: "60px auto", // 'auto' centers the whole grid on the page
    padding: "0 20px",    // Side padding for mobile screens
    boxSizing: "border-box"
  }}
>
  {[
    { icon: <FaBriefcase />, count: "1000+", label: "jobs posted" },
    { icon: <FaCheckCircle />, count: "100%", label: "verified" },
    { icon: <FaBuilding />, count: "200+", label: "companies" },
    { icon: <FaCalendarDay />, count: "Daily", label: "updates" },
  ].map((item, index) => (
    <div
      key={index}
      style={{
        background: "white",
        padding: "40px 24px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        cursor: "default",
        /* --- ALIGNMENT FIXES --- */
        display: "flex",
        flexDirection: "column",
        alignItems: "center",    // Horizontal center
        justifyContent: "center", // Vertical center
        textAlign: "center"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(13, 110, 253, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
      }}
    >
      {/* Icon Styling */}
      <div style={{ fontSize: "32px", color: "#0d6efd", marginBottom: "16px" }}>
        {item.icon}
      </div>

      {/* Count Styling - Responsive font size using 'vw' or clamp */}
      <h1 style={{ 
        fontSize: "clamp(2rem, 5vw, 2.5rem)", 
        fontWeight: "800", 
        color: "#1a1a1a", 
        margin: "0 0 8px 0" 
      }}>
        {item.count}
      </h1>

      {/* Label Styling */}
      <p style={{ 
        fontSize: "16px", 
        color: "#6c757d", 
        margin: "0", 
        fontWeight: "500",
        textTransform: "capitalize" 
      }}>
        {item.label}
      </p>
    </div>
  ))}
</div>
        )}

        {role === "recruiters" && (
   <div
  style={{
    display: "grid",
    /* Responsive Grid: 
       - Mobile: 1 column
       - Tablet: 2 columns
       - Desktop: 4 columns 
    */
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "1200px", // Centers the content on ultra-wide screens
    margin: "60px auto", // 'auto' handles horizontal centering
    padding: "0 20px",    // Prevents cards from touching screen edges on mobile
    boxSizing: "border-box"
  }}
>
  {[
    { icon: <FaBriefcase />, count: "1000+", label: "job seekers" },
    { icon: <FaCheckCircle />, count: "100%", label: "verified" },
    { icon: <FaBuilding />, count: "200+", label: "companies" },
    { icon: <FaCalendarDay />, count: "Daily", label: "updates" },
  ].map((item, index) => (
    <div
      key={index}
      style={{
        background: "white",
        padding: "40px 24px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        transition: "all 0.3s ease",
        cursor: "default",
        
        /* --- ALIGNMENT FIXES --- */
        display: "flex",
        flexDirection: "column",
        alignItems: "center",     // Centers icons/text horizontally
        justifyContent: "center",  // Centers content vertically
        textAlign: "center"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 12px 32px rgba(13, 110, 253, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.08)";
      }}
    >
      {/* Icon Wrapper */}
      <div style={{ fontSize: "32px", color: "#0d6efd", marginBottom: "16px" }}>
        {item.icon}
      </div>

      {/* Responsive Title: clamp makes it shrink on mobile and grow on desktop */}
      <h1 style={{ 
        fontSize: "clamp(1.8rem, 4vw, 2.5rem)", 
        fontWeight: "800", 
        color: "#1a1a1a", 
        margin: "0 0 8px 0" 
      }}>
        {item.count}
      </h1>

      {/* Label */}
      <p style={{ 
        fontSize: "16px", 
        color: "#6c757d", 
        margin: "0", 
        fontWeight: "500",
        textTransform: "capitalize"
      }}>
        {item.label}
      </p>
    </div>
  ))}
</div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}

export default LandingPage;