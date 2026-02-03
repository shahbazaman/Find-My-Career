import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// 1. Import Toastify components and CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyJobs = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyJobs = async () => {
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/jobs/recruiter/my-jobs", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  // 2. The Actual Delete Logic
  const executeDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setJobs(prev => prev.filter(job => job._id !== jobId));
      toast.success("Job deleted successfully! 🗑️");
    } catch (err) {
      toast.error("Failed to delete the job.");
    }
  };

  // 3. Custom Toast Confirmation
  const confirmDelete = (jobId) => {
    toast.warn(({ closeToast }) => (
      <div>
        <p style={{ marginBottom: "10px", fontWeight: "600" }}>Are you sure you want to delete this job?</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button 
            onClick={() => { executeDelete(jobId); closeToast(); }}
            style={{ background: "#ff4b2b", color: "white", border: "none", padding: "5px 12px", borderRadius: "4px", cursor: "pointer" }}
          >
            Yes, Delete
          </button>
          <button 
            onClick={closeToast}
            style={{ background: "#ccc", color: "white", border: "none", padding: "5px 12px", borderRadius: "4px", cursor: "pointer" }}
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

  useEffect(() => { fetchMyJobs(); }, []);

  return (
    <div className="jobs-container">
      {/* 4. Add the ToastContainer once in your component */}
      <ToastContainer position="top-center" autoClose={3000} />

      <style>{`
        .jobs-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
        .desktop-view { display: block; background: white; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); overflow: hidden; }
        table { width: 100%; border-collapse: collapse; }
        thead { background: #0c248d; color: white; }
        th, td { padding: 16px; text-align: left; border-bottom: 1px solid #eee; }
        .mobile-view { display: none; }
        .job-card { background: white; border: 1px solid #e0e0e0; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
        .card-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f5f5f5; }
        .card-label { font-weight: 700; color: #666; font-size: 13px; }
        .btn-group { display: flex; gap: 8px; margin-top: 12px; }
        .action-btn { flex: 1; border: none; padding: 10px; border-radius: 6px; font-weight: 600; color: white !important; cursor: pointer; font-size: 13px; text-align: center; }
        .edit-btn { background: #4facfe; }
        .apps-btn { background: #764ba2; }
        .del-btn { background: #ff4b2b; }
        .status-pill { padding: 4px 10px; border-radius: 20px; background: #e6fffa; color: #047857; font-size: 12px; font-weight: bold; }
        @media screen and (max-width: 770px) {
          .desktop-view { display: none; }
          .mobile-view { display: block; }
          .jobs-container { padding: 10px; }
        }
      `}</style>

      <h2 style={{ marginBottom: "20px", color: "#2d3748" }}>My Posted Jobs</h2>

      {loading && <p>Loading...</p>}

      {/* DESKTOP VIEW */}
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
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td>{job.jobTitle}</td>
                  <td>{job.companyName}</td>
                  <td><span className="status-pill">{job.status || "Active"}</span></td>
                  <td>
                    <div className="btn-group">
                      <button className="action-btn edit-btn" onClick={() => navigate(`/edit-job/${job._id}`)}>Edit</button>
                      <button className="action-btn apps-btn" onClick={() => navigate(`/recruiter/applicants/${job._id}`)}>Applicants</button>
                      {/* 5. Call confirmDelete */}
                      <button className="action-btn del-btn" onClick={() => confirmDelete(job._id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MOBILE VIEW */}
      {!loading && jobs.length > 0 && (
        <div className="mobile-view">
          {jobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="card-row">
                <span className="card-label">JOB TITLE</span>
                <span className="card-value">{job.jobTitle}</span>
              </div>
              <div className="card-row">
                <span className="card-label">COMPANY</span>
                <span className="card-value">{job.companyName}</span>
              </div>
              <div className="card-row">
                <span className="card-label">STATUS</span>
                <span className="status-pill">{job.status || "Active"}</span>
              </div>
              
              <div className="btn-group" style={{ flexDirection: "column" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="action-btn edit-btn" onClick={() => navigate(`/edit-job/${job._id}`)}>Edit</button>
                  <button className="action-btn apps-btn" onClick={() => navigate(`/recruiter/applicants/${job._id}`)}>Applicants</button>
                </div>
                {/* 5. Call confirmDelete */}
                <button className="action-btn del-btn" onClick={() => confirmDelete(job._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyJobs;