import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Added missing import
import { BsEnvelope, BsSend, BsTrophy, BsClockHistory, BsCheckCircleFill } from "react-icons/bs";
import { getUserId } from "../utils/auth";
import Swal from "sweetalert2";
import { logout } from "../utils/auth";

export default function Manage() {
  const navigate = useNavigate(); // Initialize navigate
  const [isVisible, setIsVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const userId = getUserId();

  useEffect(() => {
    setIsVisible(true);

    if (!userId) return;

    // 1. Get the current user from localStorage to check their role
    const storedUser = JSON.parse(localStorage.getItem("user"));

    // 2. Role-Based Redirection Logic
    // Using your exact schema strings: "recruiters" and "job seekers"
    if (storedUser?.role === "recruiters") {
      console.log("Recruiter detected on Job Seeker page. Redirecting...");
      navigate("/manageCompany");
      return; 
    }

    // 3. Fetch Profile only if they are a job seeker
const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setProfile(res.data);
      } catch (err) {
        // 404 means the job seeker has NEVER created a profile
        if (err.response && err.response.status === 404) {
           console.log("No job seeker profile found. Redirecting to setup...");
           navigate("/ProfileForm"); // Redirect to your job seeker form page
        } else {
           console.error("Profile fetch failed:", err.message);
        }
      }
    };

    if (storedUser?.role === "job seekers") {
      fetchProfile();
    }
  }, [userId, navigate]);

  /* ================= LOADING STATE ================= */
  if (!profile) {
    return (
      <div style={{ minHeight: "100vh", background: "#1e1b4b", padding: 50 }}>
        <h2 style={{ color: "white" }}>Loading job seeker profile...</h2>
      </div>
    );
  }

  /* ================= DYNAMIC PROGRESS LOGIC ================= */
  let progress = 0;
  const totalSections = 4;
  if (profile.name && profile.mobile && profile.email) progress++;
  if (profile.experience && profile.experience.length > 0) progress++;
  if (profile.education && profile.education.length > 0) progress++;
  if (profile.skills && profile.skills.primarySkills) progress++;
  const progressPercent = Math.round((progress / totalSections) * 100);

  /* ================= UI VALUES MAPPED FROM DB ================= */
  const candidate = {
    name: `${profile.name || "No Name"}`,
    title: profile.experience?.[0]?.position || "No Title Added",
    avatar: profile.photoUrl || "https://via.placeholder.com/200",
    skills: profile.skills?.primarySkills
      ? profile.skills.primarySkills.split(",").map((s) => s.trim())
      : [],
    location: profile.location || "Not added",
    timezone: "IST",
  };

  /* ================= DELETE ACCOUNT ================= */
  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: "Delete account?",
      text: "This action is permanent. All your data will be removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete my account"
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/delete`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      await Swal.fire({
        icon: "success",
        title: "Account deleted",
        text: "Your account has been permanently deleted",
        timer: 2000,
        showConfirmButton: false
      });

      logout(); // clears storage + redirects to login
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Failed to delete account",
        "error"
      );
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e293b 100%)",
      padding: "40px 20px"
    }}>
      <div style={{ maxWidth: "1600px", margin: "0 auto" }}>

        {/* TOP PROGRESS BANNER */}
        <div style={{
          marginBottom: "30px",
          padding: "18px 24px",
          background: "rgba(255, 255, 255, 0.06)",
          borderRadius: "16px",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <h2 style={{ margin: 0 }}>Profile Completion</h2>
          <div style={{ width: "220px", background: "rgba(255,255,255,0.1)", borderRadius: "12px", overflow: "hidden" }}>
            <div style={{
              width: `${progressPercent}%`,
              height: "14px",
              background: "linear-gradient(90deg, #667eea, #764ba2)",
              transition: "width 0.8s"
            }} />
          </div>
          <h3 style={{ margin: 0 }}>{progressPercent}%</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "350px 1fr", gap: "30px" }}>
        
          {/* LEFT SIDEBAR */}
          <div style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateX(0)" : "translateX(-50px)",
            transition: "all 0.8s ease-out"
          }}>
            <div style={{
              background: "rgba(255, 255, 255, 0.05)",
              padding: "30px",
              borderRadius: "25px",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}>

              {/* Avatar */}
              <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
                <img
                  src={candidate.avatar}
                  alt="avatar"
                  style={{ width: "70px", height: "70px", borderRadius: "18px", objectFit: "cover" }}
                />
                <div>
                  <p style={{ color: "#94a3b8", margin: 0, fontSize: "0.8rem" }}>JOB SEEKER</p>
                  <h4 style={{ color: "white", margin: 0 }}>{candidate.name}</h4>
                </div>
              </div>

              <div style={{
                padding: "6px 16px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "20px",
                color: "white",
                marginBottom: "15px",
                display: "inline-block",
                fontSize: "0.9rem"
              }}>
                {candidate.title}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {candidate.skills.length > 0
                  ? candidate.skills.map((skill) => (
                      <span key={skill} style={{
                        padding: "4px 10px",
                        borderRadius: "8px",
                        background: "rgba(255,255,255,0.08)",
                        color: "white",
                        fontSize: "0.85rem"
                      }}>
                        {skill}
                      </span>
                    ))
                  : <span style={{ color: "#94a3b8" }}>No skills added</span>
                }
              </div>

              {/* INFO */}
              <div style={{ marginTop: "20px", color: "#cbd5e1", fontSize: "0.95rem" }}>
                <p>📍 {candidate.location}</p>
                <p>📧 {profile.email}</p>
                <p>📱 {profile.mobile}</p>
                <p>🕓 {candidate.timezone}</p>
              </div>

              {/* 🔴 DELETE ACCOUNT */}
              <div style={{ marginTop: "25px" }}>
                <button
                  onClick={handleDeleteAccount}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "rgba(239,68,68,0.15)",
                    color: "#fecaca",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.3)")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.15)")}
                >
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div>
            {/* EXPERIENCE CARD */}
            <SectionCard title="Experience">
              {profile.experience?.length > 0 ? (
                profile.experience.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: "15px", borderLeft: "2px solid #667eea", paddingLeft: "15px" }}>
                    <h4 style={{ color: "white", margin: "0 0 5px" }}>{exp.position}</h4>
                    <p style={{ color: "#cbd5e1", margin: 0 }}>
                      {exp.company} | <span style={{ fontSize: "0.9rem", color: "#94a3b8" }}>{exp.startDate} - {exp.endDate || "Present"}</span>
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: "#94a3b8" }}>No experience added</p>
              )}
            </SectionCard>

            {/* EDUCATION CARD */}
            <SectionCard title="Education">
              {profile.education?.length > 0 ? (
                profile.education.map((ed, idx) => (
                  <div key={idx} style={{ marginBottom: "15px" }}>
                    <h4 style={{ color: "white", margin: "0 0 5px" }}>{ed.degree}</h4>
                    <p style={{ color: "#cbd5e1", margin: 0 }}>
                      {ed.institute} <span style={{ color: "#94a3b8" }}>({ed.startYear} - {ed.endYear})</span>
                    </p>
                  </div>
                ))
              ) : (
                <p style={{ color: "#94a3b8" }}>No education added</p>
              )}
            </SectionCard>

            {/* SKILLS CARD */}
            <SectionCard title="Skills Overview">
              {profile.skills?.primarySkills ? (
                <>
                  <p style={{ color: "white", fontWeight: "600" }}>{profile.skills.primarySkills}</p>
                  <p style={{ color: "#94a3b8", fontSize: "0.95rem", lineHeight: "1.6" }}>{profile.skills.summary}</p>
                </>
              ) : (
                <p style={{ color: "#94a3b8" }}>No skills added</p>
              )}
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper Component */
function SectionCard({ title, children }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.05)",
      padding: "25px",
      borderRadius: "18px",
      marginBottom: "25px",
      border: "1px solid rgba(255,255,255,0.1)"
    }}>
      <h3 style={{ color: "white", marginBottom: "15px" }}>{title}</h3>
      {children}
    </div>
  );
}