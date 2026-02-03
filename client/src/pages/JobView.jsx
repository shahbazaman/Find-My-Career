import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const JobView = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  /* ================= FETCH JOB ================= */
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`
        );
        setJob(res.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to load job");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  /* ================= APPLY HANDLER ================= */
  const handleApply = async (jobId) => {
    try {
      setApplying(true);

      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to apply");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/applications/apply/${jobId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Applied successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Application failed"
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ padding: "60px", textAlign: "center" }}>
        Job not found
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px"
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ color: "#667eea", marginBottom: "10px" }}>
          {job.jobTitle}
        </h2>

        {/* 🔴 CLOSED JOB WARNING */}
        {job.status === "closed" && (
          <div
            style={{
              background: "#fee2e2",
              color: "#991b1b",
              padding: "10px 14px",
              borderRadius: "8px",
              marginBottom: "14px",
              fontWeight: "600"
            }}
          >
            🚫 This job is no longer accepting applications
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <h4 style={{ color: "#495057", marginBottom: "20px" }}>
            {job.companyName}
          </h4>

          {job.companyLogo && (
            <img
              src={job.companyLogo}
              alt="Company Logo"
              style={{
                width: "70px",
                height: "70px",
                objectFit: "contain",
                borderRadius: "8px"
              }}
            />
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Location:</strong> {job.location}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Work Mode:</strong> {job.workMode}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Job Type:</strong> {job.jobType}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Salary:</strong> {job.salaryMin} – {job.salaryMax}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Experience:</strong> {job.experienceMin} – {job.experienceMax} years
        </div>

        <hr style={{ margin: "25px 0" }} />

        <h4>Description</h4>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          {job.description}
        </p>

        <h4 style={{ marginTop: "20px" }}>Requirements</h4>
        <p style={{ lineHeight: "1.7", color: "#555" }}>
          {job.requirements}
        </p>

        {/* ================= APPLY SECTION ================= */}
        <div style={{ marginTop: "30px", textAlign: "center" }}>
          <button
            disabled={job.status === "closed" || applying}
            onClick={() => handleApply(job._id)}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor:
                job.status === "closed" ? "not-allowed" : "pointer",
              background:
                job.status === "closed"
                  ? "#e5e7eb"
                  : "linear-gradient(90deg, #667eea, #764ba2)",
              color:
                job.status === "closed" ? "#6b7280" : "white"
            }}
          >
            {job.status === "closed"
              ? "Applications Closed"
              : applying
              ? "Applying..."
              : "Apply Now"}
          </button>
        </div>

        {job.benefits?.length > 0 && (
          <>
            <h4 style={{ marginTop: "20px" }}>Benefits</h4>
            <ul>
              {job.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default JobView;
