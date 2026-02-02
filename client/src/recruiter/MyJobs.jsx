import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyJobs = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH RECRUITER JOBS ================= */
  const fetchMyJobs = async () => {
    if (!token) {
      setError("Authentication required");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        "http://localhost:5000/api/jobs/recruiter/my-jobs",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("FETCH MY JOBS ERROR:", err);
      setError(err?.response?.data?.message || "Failed to load jobs");
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE JOB ================= */
  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setJobs(prev => prev.filter(job => job._id !== jobId));
    } catch (err) {
      console.error("DELETE JOB ERROR:", err);
      alert(err?.response?.data?.message || "Failed to delete job");
    }
  };

  useEffect(() => {
    fetchMyJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================= UI ================= */
  return (
    <>
      <style>{`
        .jobs-wrapper {
          background: white;
          border-radius: 24px;
          padding: 2rem;
          color: #2d3748;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
        }

        .jobs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .jobs-header h3 {
          margin: 0;
          font-size: 1.6rem;
          font-weight: 700;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 650px;
          border-radius: 60px;
        }

        th, td {
          padding: 1rem;
          text-align: left;
        }

        thead {
          background: linear-gradient(135deg, #060729ff 0%, #0c248dff 100%);
          color: white;
        }

        tbody tr {
          border-bottom: 1px solid #e2e8f0;
        }

        tbody tr:hover {
          background: #f8fafc;
        }

        .btn {
          border: none;
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .edit { background:#4facfe; color:white; }
        .delete { background:#ff4b2b; color:white; }

        .add-job-btn {
          background: linear-gradient(135deg,#667eea,#764ba2);
          color: white;
        }

        .table-wrapper {
          overflow-x: auto;
          border-radius: 20px;
        }

        .status {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
          background: #edf2f7;
        }

        .open { background:#e6fffa; color:#047857; }
        .closed { background:#fee2e2; color:#b91c1c; }

        @media(max-width:768px){
          .jobs-wrapper { padding: 1.3rem; }
          table { font-size:14px; }
          th,td { padding:.6rem; }
        }
      `}</style>

      <div className="jobs-wrapper">

        {loading && <p>Loading jobs...</p>}

        {!loading && error && (
          <p style={{ color: "red" }}>{error}</p>
        )}

        {!loading && !error && jobs.length === 0 && (
          <p>No jobs posted yet.</p>
        )}

        {!loading && jobs.length > 0 && (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Status</th>
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
                      <span className={`status ${job.status || "open"}`}>
                        {job.status || "open"}
                      </span>
                    </td>
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
                      </button>{" "}

                      <button
                        className="btn"
                        style={{
                          background: "linear-gradient(135deg,#667eea,#764ba2)",
                          color: "white",
                          marginLeft: "6px"
                        }}
                        onClick={() => navigate(`/recruiter/applicants/${job._id}`)}
                      >
                        Applicants
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyJobs;
