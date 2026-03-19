import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyJobs = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewingJob, setViewingJob] = useState(null);
const [viewLoading, setViewLoading] = useState(false);
  const fetchMyJobs = async () => {
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/recruiter/my-jobs`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("MyJobs fetch error:", err);
      setError("Failed to load jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };
const handleViewJob = async (jobId) => {
  setViewingJob({}); // open modal immediately with loading state
  setViewLoading(true);
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`
    );
    setViewingJob(res.data);
  } catch {
    toast.error("Failed to load job details", { position: "top-center" });
    setViewingJob(null);
  } finally {
    setViewLoading(false);
  }
};
  /* ================= DELETE LOGIC ================= */
  const executeDelete = async (jobId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJobs(prev => prev.filter(job => job._id !== jobId));
      toast.success("Job deleted successfully! 🗑️");
    } catch {
      toast.error("Failed to delete the job.");
    }
  };

  const confirmDelete = (jobId) => {
    toast.warn(({ closeToast }) => (
      <div>
        <p style={{ marginBottom: "10px", fontWeight: "600" }}>
          Are you sure you want to delete this job?
        </p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => {
              executeDelete(jobId);
              closeToast();
            }}
            style={{
              background: "#ff4b2b",
              color: "white",
              border: "none",
              padding: "5px 12px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Yes, Delete
          </button>

          <button
            onClick={closeToast}
            style={{
              background: "#ccc",
              color: "white",
              border: "none",
              padding: "5px 12px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            No
          </button>
        </div>
      </div>
    ), {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      draggable: false,
    });
  };

  useEffect(() => {
    fetchMyJobs();
  }, []);

  return (
    <div className="jobs-container">
      <ToastContainer position="top-center" autoClose={3000} />

      <style>{`
        .jobs-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
        .desktop-view { display: block; background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        thead { background: #0c248d; color: white; }
        th, td { padding: 16px; text-align: left; border-bottom: 1px solid #eee; }
        .mobile-view { display: none; }
        .job-card { background: white; border: 1px solid #e0e0e0; border-radius: 16px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.07); }
        .card-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f0f0f0; }
        .card-label { font-weight: 700; color: #888; font-size: 11px; letter-spacing: 0.6px; text-transform: uppercase; }
        .card-value { font-size: 15px; font-weight: 600; color: #1e293b; text-align: right; max-width: 60%; }
        .btn-group { display: flex; gap: 8px; margin-top: 16px; flex-direction: column; }
        .top-btn-row { display: flex; gap: 8px; }
        .action-btn { border: none; padding: 11px 8px; border-radius: 10px; font-weight: 700; color: white !important; cursor: pointer; font-size: 13px; text-align: center; }
        .edit-btn { background: #4facfe; }
        .apps-btn { background: #764ba2; }
        .del-btn { background: #ff4b2b; width: 100%; font-size: 14px; padding: 12px; border-radius: 10px; }
        .view-btn { background: #10b981; }
        .top-btn-row .action-btn { flex: 1; }
        .status-pill { padding: 5px 12px; border-radius: 20px; background: #e6fffa; color: #047857; font-size: 12px; font-weight: 700; }

        @media screen and (max-width: 770px) {
          .desktop-view { display: none; }
          .mobile-view { display: block; }
          .jobs-container { padding: 12px; }
        }
      `}</style>

      <h2 style={{ marginBottom: "20px", color: "#2d3748" }}>
        {/* My Posted Jobs */}   
          
      </h2>

      {loading && <p>Loading...</p>}

      {!loading && jobs.length > 0 && (
        <div className="desktop-view">
          <table>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job._id}>
                  <td>{job.jobTitle}</td>
                  <td>{job.companyName}</td>
                  <td>
                    <span className="status-pill">
                      {job.status || "Active"}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
  className="action-btn view-btn"
  onClick={() => handleViewJob(job._id)}
>
  View
</button>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => navigate(`/edit-job/${job._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="action-btn apps-btn"
                        onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
                      >
                        Applicants
                      </button>
                      <button
                        className="action-btn del-btn"
                        onClick={() => confirmDelete(job._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <div className="mobile-view">
  {jobs.map(job => (
    <div className="job-card" key={job._id}>
      <div className="card-row">
        <span className="card-label">Job Title</span>
        <span className="card-value">{job.jobTitle}</span>
      </div>

      <div className="card-row">
        <span className="card-label">Company</span>
        <span className="card-value">{job.companyName}</span>
      </div>

      <div className="card-row" style={{ borderBottom: "none" }}>
        <span className="card-label">Status</span>
        <span className="status-pill">{job.status || "Active"}</span>
      </div>

      <div className="btn-group">
        <div className="top-btn-row">
          <button
            className="action-btn view-btn"
            onClick={() => handleViewJob(job._id)}
          >
            View
          </button>
          <button
            className="action-btn edit-btn"
            onClick={() => navigate(`/edit-job/${job._id}`)}
          >
            Edit
          </button>
          <button
            className="action-btn apps-btn"
            onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
          >
            Applicants
          </button>
        </div>

        <button
          className="action-btn del-btn"
          onClick={() => confirmDelete(job._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
      )}
      {/* ── JOB DETAILS MODAL ── */}
{viewingJob !== null && (
  <div
    style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: "16px",
    }}
    onClick={() => setViewingJob(null)}
  >
    <div
      style={{
        background: "white", borderRadius: "20px",
        width: "100%", maxWidth: "680px",
        maxHeight: "85vh", overflowY: "auto",
        padding: "36px", position: "relative",
        boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        animation: "slideUp 0.3s ease-out",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        onClick={() => setViewingJob(null)}
        style={{
          position: "absolute", top: "16px", right: "16px",
          background: "#f1f5f9", border: "none", borderRadius: "50%",
          width: "32px", height: "32px", cursor: "pointer",
          fontSize: "16px", display: "flex", alignItems: "center",
          justifyContent: "center", color: "#64748b",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#e2e8f0"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#f1f5f9"}
      >
        ✕
      </button>

      {/* Loading state */}
      {viewLoading ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "200px", gap: "16px" }}>
          <div style={{
            width: "44px", height: "44px",
            border: "4px solid #e2e8f0",
            borderTop: "4px solid #10b981",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }} />
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>Loading job details...</p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            {viewingJob.companyLogo ? (
              <img
                src={viewingJob.companyLogo}
                alt="logo"
                style={{ width: "60px", height: "60px", borderRadius: "12px", objectFit: "cover", border: "1px solid #e2e8f0" }}
              />
            ) : (
              <div style={{
                width: "60px", height: "60px", borderRadius: "12px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: "22px", fontWeight: "700", flexShrink: 0,
              }}>
                {viewingJob.companyName?.[0]?.toUpperCase()}
              </div>
            )}
            <div>
              <h3 style={{ margin: 0, fontWeight: "800", fontSize: "1.4rem", color: "#1e293b" }}>
                {viewingJob.jobTitle}
              </h3>
              <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "14px" }}>
                {viewingJob.companyName}
              </p>
            </div>
          </div>

          {/* Info grid */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "12px", marginBottom: "24px",
          }}>
            {[
              ["📍 Location",   viewingJob.location],
              ["💼 Job Type",   viewingJob.jobType],
              ["🖥 Work Mode",  viewingJob.workMode],
              ["📊 Status",     viewingJob.status || "open"],
              ["💰 Salary",     viewingJob.salaryMin
                ? `₹${viewingJob.salaryMin.toLocaleString()}${viewingJob.salaryMax ? ` – ₹${viewingJob.salaryMax.toLocaleString()}` : "+"}`
                : "Not specified"],
              ["🎓 Experience", viewingJob.experienceMin !== undefined
                ? `${viewingJob.experienceMin}${viewingJob.experienceMax ? `–${viewingJob.experienceMax}` : "+"} yrs`
                : "Not specified"],
              ["📅 Deadline",   viewingJob.deadline
                ? new Date(viewingJob.deadline).toLocaleDateString()
                : "No deadline"],
              ["🕒 Posted",     viewingJob.createdAt
                ? new Date(viewingJob.createdAt).toLocaleDateString()
                : "—"],
            ].map(([label, value]) => (
              <div key={label} style={{
                background: "#f8fafc", borderRadius: "10px",
                padding: "12px 14px", border: "1px solid #e2e8f0",
              }}>
                <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>
                  {label}
                </div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e293b", textTransform: "capitalize" }}>
                  {value || "—"}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          {viewingJob.description && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600", marginBottom: "8px" }}>
                Description
              </p>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.8", margin: 0 }}>
                {viewingJob.description}
              </p>
            </div>
          )}

          {/* Requirements */}
          {viewingJob.requirements && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600", marginBottom: "8px" }}>
                Requirements
              </p>
              <p style={{ fontSize: "14px", color: "#475569", lineHeight: "1.8", margin: 0 }}>
                {viewingJob.requirements}
              </p>
            </div>
          )}

          {/* Benefits */}
          {viewingJob.benefits?.length > 0 && (
            <div style={{ marginBottom: "20px" }}>
              <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600", marginBottom: "10px" }}>
                Benefits
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {viewingJob.benefits.map((b, i) => (
                  <span key={i} style={{
                    background: "#ecfdf5", color: "#059669",
                    padding: "5px 14px", borderRadius: "20px",
                    fontSize: "13px", fontWeight: "500",
                    border: "1px solid #a7f3d0",
                  }}>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div style={{ marginTop: "28px", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={() => setViewingJob(null)}
              style={{
                padding: "10px 28px", borderRadius: "10px",
                border: "2px solid #e2e8f0", background: "white",
                fontWeight: "600", fontSize: "14px",
                cursor: "pointer", color: "#475569", transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.borderColor = "#cbd5e1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#e2e8f0"; }}
            >
              Close
            </button>
          </div>
        </>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
)}
    </div>
  );
};

export default MyJobs;
