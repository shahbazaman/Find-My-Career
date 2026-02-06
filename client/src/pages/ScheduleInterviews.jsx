import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FiArrowLeft, FiCalendar, FiX, FiUsers, FiClock, 
  FiVideo, FiMapPin, FiInfo, FiCheckCircle 
} from "react-icons/fi";
import { toast } from "react-toastify";

const ScheduleInterview = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  // Consolidate applicants from state
  const selectedApplicants = state?.applicants || [];

  const [form, setForm] = useState({
    date: "",
    time: "",
    mode: "Online",
    locationOrLink: "",
    notes: ""
  });

  const [showApplicantsModal, setShowApplicantsModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Safety: prevent direct access if no applicants are passed
  // Redirects to previous page instead of a hardcoded path that might not exist
  useEffect(() => {
    if (!selectedApplicants || selectedApplicants.length === 0) {
      toast.warn("Please select applicants first");
      navigate(-1); 
    }
  }, [selectedApplicants, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    
    // Extracting data for the API and redirect
    const firstApplicant = selectedApplicants[0];
    const jobTitle = firstApplicant?.jobTitle || "Position";
    
    // Crucial: Finding the jobId to navigate back to /recruiter/applicants/:jobId
    const jobId = state?.jobId || firstApplicant?.jobId || firstApplicant?.job?._id;

    const companyName = storedUser.companyName || `${storedUser.firstName} ${storedUser.lastName}`;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/interviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          applicationIds: selectedApplicants.map(a => a._id),
          companyName,
          jobTitle,
          interviewDate: form.date,
          interviewTime: form.time,
          mode: form.mode,
          locationOrLink: form.locationOrLink,
          notes: form.notes
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || "Interviews scheduled successfully!");
        
        // Navigation matches your App.jsx route: /recruiter/applicants/:jobId
        if (jobId) {
          navigate(`/recruiter/applicants/${jobId}`);
        } else {
          navigate("/");
        }
      } else {
        throw new Error(data.message || "Failed to schedule");
      }
    } catch (error) {
      console.error("Schedule interview error:", error);
      toast.error(error.message || "Failed to schedule interview");
    } finally {
      setLoading(false);
    }
  };

  // Prevent rendering if redirecting
  if (!selectedApplicants.length) return null;

  const styles = {
    container: {
      padding: "clamp(1rem, 5vw, 2.5rem)",
      maxWidth: "900px",
      margin: "0 auto",
      fontFamily: "'Inter', sans-serif"
    },
    card: {
      background: "#fff",
      padding: "clamp(1.25rem, 4vw, 2rem)",
      borderRadius: "16px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      border: "1px solid #f0f0f0"
    },
    inputGroup: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginBottom: "1.5rem"
    },
    label: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.9rem",
      fontWeight: "600",
      color: "#4a5568",
      marginBottom: "0.5rem"
    },
    input: {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s",
      boxSizing: "border-box"
    },
    badge: {
      background: "#ebf4ff",
      color: "#4c51bf",
      padding: "4px 12px",
      borderRadius: "99px",
      fontSize: "0.85rem",
      fontWeight: "bold"
    }
  };

  return (
    <div style={styles.container}>
      {/* Header Navigation */}
      <button
        onClick={() => navigate(-1)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "none",
          background: "none",
          cursor: "pointer",
          marginBottom: "1.5rem",
          color: "#667eea",
          fontWeight: "600",
          fontSize: "1rem"
        }}
      >
        <FiArrowLeft /> Back
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "clamp(1.5rem, 4vw, 2rem)", color: "#1a202c", display: "flex", alignItems: "center", gap: "12px" }}>
            <FiCalendar style={{ color: "#667eea" }} /> Schedule Interview
          </h1>
          <p style={{ color: "#718096", marginTop: "0.5rem" }}>
            Setting up interviews for <strong>{selectedApplicants[0]?.jobTitle || "the selected role"}</strong>
          </p>
        </div>
        <div style={styles.badge}>
          <FiUsers /> {selectedApplicants.length} Selected
        </div>
      </div>

      <button
        type="button"
        onClick={() => setShowApplicantsModal(true)}
        style={{
          marginBottom: "2rem",
          padding: "0.6rem 1.2rem",
          borderRadius: "8px",
          border: "1px dashed #667eea",
          background: "#f7fafc",
          color: "#667eea",
          fontWeight: "500",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        View Selected Candidate List
      </button>

      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.inputGroup}>
          <div>
            <label htmlFor="date" style={styles.label}><FiCalendar /> Interview Date</label>
            <input 
              id="date" // 👈 Added ID
              type="date" 
              name="date" 
              autoComplete="off" // 👈 Added autocomplete
              style={styles.input} 
              required 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label style={styles.label}><FiClock /> Interview Time</label>
            <input 
              type="time" 
              name="time" 
              style={styles.input} 
              required 
              onChange={handleChange} 
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <div>
            <label style={styles.label}><FiVideo /> Interview Mode</label>
            <select 
              name="mode" 
              value={form.mode} 
              onChange={handleChange} 
              style={styles.input}
            >
              <option value="Online">Online (Zoom/Google Meet)</option>
              <option value="In-person">In-person (At Office)</option>
            </select>
          </div>
          <div>
            <label style={styles.label}>
              {form.mode === "Online" ? <><FiVideo /> Meeting Link</> : <><FiMapPin /> Office Location</>}
            </label>
            <input
              type="text"
              name="locationOrLink"
              style={styles.input}
              placeholder={form.mode === "Online" ? "https://meet.google.com/..." : "123 Business Street, Suite 4B"}
              required
              onChange={handleChange}
            />
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={styles.label}><FiInfo /> Additional Instructions (Optional)</label>
          <textarea 
            name="notes" 
            rows={4} 
            style={{ ...styles.input, resize: "vertical" }} 
            placeholder="Tell candidates what to prepare..."
            onChange={handleChange} 
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "1rem",
            border: "none",
            borderRadius: "10px",
            background: loading ? "#a0aec0" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "#fff",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "transform 0.2s"
          }}
        >
          {loading ? "Processing..." : <><FiCheckCircle /> Confirm & Send Invitations</>}
        </button>
      </form>

      {/* ===== APPLICANTS MODAL ===== */}
      {showApplicantsModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(26, 32, 44, 0.8)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem"
        }}>
          <div style={{
            background: "#fff",
            width: "100%",
            maxWidth: "500px",
            borderRadius: "16px",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
              <h3 style={{ margin: 0 }}>Review Candidates</h3>
              <FiX style={{ cursor: "pointer", fontSize: "1.5rem" }} onClick={() => setShowApplicantsModal(false)} />
            </div>
            <div style={{ overflowY: "auto", flex: 1, paddingRight: "5px" }}>
              {selectedApplicants.map((a) => (
                <div key={a._id} style={{
                  padding: "1rem",
                  borderBottom: "1px solid #edf2f7",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#667eea", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                    {a.name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <div style={{ fontWeight: "600" }}>{a.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#718096" }}>{a.email}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowApplicantsModal(false)}
              style={{
                marginTop: "1.5rem",
                padding: "0.8rem",
                borderRadius: "8px",
                border: "none",
                background: "#f7fafc",
                color: "#4a5568",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              Close List
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleInterview;