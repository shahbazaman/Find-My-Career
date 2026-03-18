import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsBookmarkFill, BsArrowLeft } from "react-icons/bs";
import { CgWorkAlt } from "react-icons/cg";
import { BiRupee } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";

export default function SavedJobs() {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/saved-jobs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSavedJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to load saved jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (jobId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/saved-jobs/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSavedJobs(prev => prev.filter(s => s.job?._id !== jobId));
      toast.info("Job removed from saved");
    } catch (err) {
      toast.error("Failed to remove job");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
      padding: "clamp(20px, 4vw, 50px) clamp(16px, 4vw, 40px)"
    }}>
      <ToastContainer position="top-center" autoClose={3000} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center",
          gap: "16px", marginBottom: "36px", flexWrap: "wrap"
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white", padding: "10px 18px",
              borderRadius: "50px", cursor: "pointer",
              fontSize: "14px", fontWeight: "600",
              display: "flex", alignItems: "center", gap: "8px",
            }}
          >
            <BsArrowLeft /> Back
          </button>
          <div>
            <h1 style={{
              color: "white", margin: 0,
              fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: "800"
            }}>
              🔖 Saved Jobs
            </h1>
            <p style={{ color: "rgba(255,255,255,0.6)", margin: "4px 0 0", fontSize: "14px" }}>
              {savedJobs.length} job{savedJobs.length !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <div style={{
              width: "48px", height: "48px",
              border: "4px solid rgba(255,255,255,0.2)",
              borderTop: "4px solid white",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px"
            }} />
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px" }}>
              Loading saved jobs...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && savedJobs.length === 0 && (
          <div style={{
            textAlign: "center", padding: "80px 20px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "24px",
            border: "1px solid rgba(255,255,255,0.15)"
          }}>
            <BsBookmarkFill size={56} color="rgba(255,255,255,0.2)"
              style={{ marginBottom: "20px" }} />
            <h3 style={{ color: "white", fontWeight: "700",
              fontSize: "1.3rem", marginBottom: "10px" }}>
              No Saved Jobs Yet
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)",
              fontSize: "14px", marginBottom: "28px" }}>
              Browse jobs and click the bookmark icon to save them here
            </p>
            <button
              onClick={() => navigate("/manage")}
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "white", border: "none",
                padding: "12px 32px", borderRadius: "50px",
                cursor: "pointer", fontWeight: "700", fontSize: "15px",
                boxShadow: "0 4px 15px rgba(102,126,234,0.4)"
              }}
            >
              Browse Jobs
            </button>
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && savedJobs.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(280px, 30vw, 340px), 1fr))",
            gap: "20px"
          }}>
            {savedJobs.map(({ job }) => {
              if (!job) return null;
              return (
                <div key={job._id} style={{
                  background: "white", borderRadius: "20px",
                  padding: "24px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  position: "relative", overflow: "hidden",
                  transition: "transform 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  {/* Decorative corner */}
                  <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: "80px", height: "80px",
                    background: "linear-gradient(135deg, #667eea20, #764ba220)",
                    borderRadius: "0 0 0 80px"
                  }} />

                  {/* Company + Title */}
                  <h3 style={{
                    color: "#667eea", fontSize: "18px",
                    fontWeight: "700", marginBottom: "8px"
                  }}>
                    {job.companyName}
                  </h3>
                  <span style={{
                    display: "inline-block",
                    padding: "5px 12px",
                    background: "linear-gradient(135deg, #667eea15, #764ba215)",
                    borderRadius: "20px", fontSize: "13px",
                    fontWeight: "600", color: "#667eea",
                    border: "1px solid #667eea30",
                    marginBottom: "14px"
                  }}>
                    {job.jobTitle}
                  </span>

                  {/* Details */}
                  <div style={{
                    display: "flex", flexWrap: "wrap",
                    gap: "8px", marginBottom: "16px"
                  }}>
                    {job.salaryMin > 0 && (
                      <div style={{
                        display: "flex", alignItems: "center",
                        gap: "4px", background: "#f8f9fa",
                        padding: "5px 10px", borderRadius: "8px",
                        fontSize: "12px", color: "#495057"
                      }}>
                        <BiRupee size={14} color="#667eea" />
                        <span style={{ fontWeight: "600" }}>
                          {job.salaryMin}₹ - {job.salaryMax}₹
                        </span>
                      </div>
                    )}
                    <div style={{
                      display: "flex", alignItems: "center",
                      gap: "4px", background: "#f8f9fa",
                      padding: "5px 10px", borderRadius: "8px",
                      fontSize: "12px", color: "#495057"
                    }}>
                      <CgWorkAlt size={14} color="#667eea" />
                      <span style={{ fontWeight: "600" }}>
                        {job.experienceMin}-{job.experienceMax} yrs
                      </span>
                    </div>
                    <div style={{
                      display: "flex", alignItems: "center",
                      gap: "4px", background: "#f8f9fa",
                      padding: "5px 10px", borderRadius: "8px",
                      fontSize: "12px", color: "#495057"
                    }}>
                      <IoLocationOutline size={14} color="#667eea" />
                      <span style={{ fontWeight: "600" }}>{job.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    borderTop: "1px solid #e9ecef",
                    paddingTop: "14px",
                    display: "flex", gap: "8px"
                  }}>
                    <button
                      onClick={() => { window.scrollTo({ top: 0 }); navigate(`/jobs/${job._id}`); }}
                      style={{
                        flex: 1, padding: "9px",
                        background: "linear-gradient(135deg, #0d6efd, #2563eb)",
                        color: "white", border: "none",
                        borderRadius: "10px", cursor: "pointer",
                        fontWeight: "600", fontSize: "13px"
                      }}
                    >
                      View Job
                    </button>
                    <button
                      onClick={() => handleUnsave(job._id)}
                      style={{
                        width: "38px", height: "38px",
                        border: "2px solid #ffc107",
                        borderRadius: "10px", cursor: "pointer",
                        background: "#fff8e1", color: "#ffc107",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", fontSize: "16px",
                        transition: "all 0.2s", flexShrink: 0
                      }}
                      title="Remove from saved"
                    >
                      <BsBookmarkFill />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}