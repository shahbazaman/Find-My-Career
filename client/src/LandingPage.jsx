import { FaRocket, FaBriefcase, FaCheckCircle, FaBuilding, FaCalendarDay, FaUserPlus, FaSearch, FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function LandingPage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role || "guest";
  useEffect(() => {
  if (role !== "guest") return;

  const timer = setTimeout(() => {
    toast.info(
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ fontWeight: "700", fontSize: "14px" }}>
          🚀 You're browsing as a guest
        </div>
        <div style={{ fontSize: "13px", color: "#555" }}>
          Create a free account to apply for jobs and unlock full features!
        </div>
        <button
          onClick={() => { navigate("/login"); toast.dismiss(); }}
          style={{
            marginTop: "6px",
            background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
            color: "white", border: "none",
            padding: "7px 16px", borderRadius: "8px",
            cursor: "pointer", fontWeight: "600",
            fontSize: "13px", width: "fit-content"
          }}
        >
          Create Account →
        </button>
      </div>,
      {
        position: "bottom-right",
        autoClose: 8000,
        toastId: "guest-prompt",  
        closeOnClick: false,
        pauseOnHover: true,
      }
    );
  }, 6000);

  return () => clearTimeout(timer);
}, []); // ← runs once on mount
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
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "1200px",
    margin: "60px auto",
    padding: "0 20px",
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
      <div style={{ fontSize: "32px", color: "#0d6efd", marginBottom: "16px" }}>
        {item.icon}
      </div>
      <h1 style={{ 
        fontSize: "clamp(2rem, 5vw, 2.5rem)", 
        fontWeight: "800", 
        color: "#1a1a1a", 
        margin: "0 0 8px 0" 
      }}>
        {item.count}
      </h1>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "1200px",
    margin: "60px auto",
    padding: "0 20px",
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
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
      <div style={{ fontSize: "32px", color: "#0d6efd", marginBottom: "16px" }}>
        {item.icon}
      </div>
      <h1 style={{ 
        fontSize: "clamp(1.8rem, 4vw, 2.5rem)", 
        fontWeight: "800", 
        color: "#1a1a1a", 
        margin: "0 0 8px 0" 
      }}>
        {item.count}
      </h1>
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

      {/* ================= HOW IT WORKS SECTION (GUEST ONLY) ================= */}
      {role === "guest" && (
        <div
          style={{
            background: "linear-gradient(135deg, #dce8ffcc 0%, #eaf0ffcc 100%)",
            padding: "60px 20px 80px",
            marginTop: "20px",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            {/* Section Heading */}
            <h2
              style={{
                textAlign: "center",
                fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                fontWeight: "900",
                color: "#1a1a1a",
                marginBottom: "48px",
                letterSpacing: "-1px",
              }}
            >
              How It Works
            </h2>

            {/* Steps */}
            {[
              {
                number: "1",
                icon: <FaUserPlus />,
                title: "Create Profile",
                description:
                  "Sign up and build your professional profile to showcase your skills and experience.",
              },
              {
                number: "2",
                icon: <FaSearch />,
                title: "Discover Jobs",
                description:
                  "Browse through thousands of job listings or get personalized job recommendations.",
              },
              {
                number: "3",
                icon: <FaPaperPlane />,
                title: "Apply & Track",
                description:
                  "Apply to your dream jobs with one click and track your application status.",
              },
            ].map((step, index) => (
              <div
                key={index}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: "40px 32px",
                  marginBottom: index < 2 ? "24px" : "0",
                  boxShadow: "0 4px 20px rgba(13, 110, 253, 0.08)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(13, 110, 253, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(13, 110, 253, 0.08)";
                }}
              >
                {/* Step Number Circle */}
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1a56db 0%, #0c248dff 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "26px",
                    fontWeight: "800",
                    marginBottom: "20px",
                    boxShadow: "0 8px 20px rgba(13, 110, 253, 0.35)",
                  }}
                >
                  {step.number}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "800",
                    color: "#1a1a1a",
                    margin: "0 0 12px 0",
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "1rem",
                    color: "#6c757d",
                    lineHeight: "1.7",
                    margin: "0",
                    maxWidth: "420px",
                  }}
                >
                  {step.description}
                </p>
              </div>
            ))}

            {/* CTA Button */}
            <div style={{ textAlign: "center", marginTop: "40px" }}>
              <button
                onClick={() => navigate("/login")}
                style={{
                  background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
                  color: "white",
                  border: "none",
                  padding: "16px 44px",
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
                Get Started Free →
              </button>
            </div>
          </div>
        </div>
      )}

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