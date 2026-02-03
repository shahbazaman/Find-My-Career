import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Applicants from "./recruiter/Applicants.jsx";
import MyJobs from "./recruiter/MyJobs.jsx";
import CompanyProfile from "./recruiter/CompanyProfile.jsx";

const RecruiterPages = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loadingJobs, setLoadingJobs] = useState(false);
  const [loadingApps, setLoadingApps] = useState(false);

  /* ================= FETCH JOBS (FIXED) ================= */
  const fetchMyJobs = async () => {
    if (!token || !userId) return;

    try {
      setLoadingJobs(true);

      // ✅ VALID backend route
      const res = await axios.get("${import.meta.env.VITE_API_BASE_URL}/jobs");

      // ✅ filter recruiter jobs client-side
      const recruiterJobs = (res.data?.jobs || []).filter(
        job => job.recruiter === userId
      );

      setJobs(recruiterJobs);
    } catch (err) {
      console.error("FETCH JOBS ERROR:", err);
      setJobs([]);
    } finally {
      setLoadingJobs(false);
    }
  };

  /* ================= FETCH APPLICANTS (SAFE) ================= */
  const fetchApplicants = async () => {
    // ❗ backend route not implemented yet
    setApplications([]);
  };

  useEffect(() => {
    fetchMyJobs();
    fetchApplicants();
    // eslint-disable-next-line
  }, []);

  const confirmDeleteWithToast = (onConfirm) => {
  toast.warn(
    <div>
      <p style={{ fontWeight: 600, marginBottom: "6px" }}>
        Delete this job?
      </p>
      <p style={{ fontSize: "13px", marginBottom: "10px" }}>
        This action cannot be undone.
      </p>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
        <button
          onClick={() => {
            toast.dismiss();
            onConfirm();
          }}
          style={{
            background: "#dc2626",
            color: "white",
            padding: "4px 10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Delete
        </button>

        <button
          onClick={() => toast.dismiss()}
          style={{
            background: "#e5e7eb",
            padding: "4px 10px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer"
          }}
        >
          Cancel
        </button>
      </div>
    </div>,
    {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      position: "top-center"
    }
  );
};

  /* ================= DELETE JOB ================= */
const handleDelete = async (jobId) => {
  confirmDeleteWithToast(async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setJobs(prev => prev.filter(job => job._id !== jobId));
      toast.success("Job deleted");
    } catch {
      toast.error("Failed to delete job");
    }
  });
};

  return (
    <>
      <style>{`
        .wrap {
          min-height: 100vh;
          background: linear-gradient(135deg, #060729ff 0%, #0c248dff 100%);
          padding: 2rem;
          font-family: Inter, sans-serif;
        }

        .page-title {
          color: white;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 2rem;
        }

        .section {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          margin-bottom: 2.5rem;
        }

        .action-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn {
          border: none;
          padding: 0.55rem 1rem;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
        }

        .primary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .edit { background: #4facfe; color: white; }
        .delete { background: #ff4b2b; color: white; }
        .view { background: #43e97b; color: white; }

        .table-wrapper { overflow-x: auto; }
        table { width: 100%; min-width: 700px; border-collapse: collapse; }
        th, td { padding: 0.9rem; }
        thead { background: linear-gradient(135deg, #667eea, #764ba2); color: white; }

        @media (max-width: 768px) {
          .wrap { padding: 1rem; }
          .page-title { text-align: center; }
          .btn { width: 100%; margin-bottom: .5rem; }
        }
      `}</style>

      <div className="wrap">
         <ToastContainer position="top-center" />
        <h1 className="page-title">Recruiter Dashboard</h1>

        {/* ================= MY JOBS ================= */}
        <div className="section">
          <div className="action-row">
            <h4>My Jobs</h4>
            <button
              className="btn primary"
              onClick={() => navigate("/recruiter/add-job")}
            >
              + Post New Job
            </button>
          </div>

          {loadingJobs && <p>Loading jobs...</p>}
          {!loadingJobs && jobs.length === 0 && <MyJobs />}

          {jobs.length > 0 && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Company</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => (
                    <tr key={job._id}>
                      <td>{job.jobTitle}</td>
                      <td>{job.companyName}</td>
                      <td>{job.location}</td>
                      <td>
                        <button
                          className="btn edit"
                          onClick={() => navigate(`/edit-job/${job._id}`)}
                        >
                          Edit
                        </button>{" "}
                        <button
                          className="btn delete"
                          onClick={() => handleDelete(job._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ================= APPLICANTS ================= */}
        <div className="section">
          {applications.length === 0 && <Applicants />}
        </div>
      </div>
    </>
  );
};

export default RecruiterPages;
