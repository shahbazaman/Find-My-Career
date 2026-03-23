import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobView = () => {
  const { jobId }  = useParams();
  const navigate   = useNavigate();
  const [job,      setJob]      = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied,  setApplied]  = useState(false);
  const [hasResume, setHasResume] = useState(false);

  /* ================= CHECK RESUME (same as Cards.jsx) ================= */
  useEffect(() => {
    const checkResume = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId  = payload.id || payload._id;

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`
        );
        setHasResume(!!res.data?.resumeUrl);
      } catch (err) {
        console.error("Failed to check resume", err);
      }
    };

    checkResume();
  }, []);

  /* ================= FETCH JOB + CHECK IF ALREADY APPLIED ================= */
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem("token");

        const jobRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`
        );
        setJob(jobRes.data);

        if (token) {
          const appliedRes = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/applications/my`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (Array.isArray(appliedRes.data)) {
            const alreadyApplied = appliedRes.data.some(
              (app) => app.job === jobId || app.job?._id === jobId
            );
            setApplied(alreadyApplied);
          }
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        toast.error("Failed to load job", { position: "top-center" });
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  /* ================= APPLY HANDLER (with resume check) ================= */
  const handleApply = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to apply", { position: "top-center" });
      return;
    }

    if (applied) return;

    // ✅ Resume check — same toast style as Cards.jsx
    if (!hasResume) {
      toast.warning(
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>📄</span>
          <div>
            <div style={{ fontWeight: "700", marginBottom: "4px" }}>Resume Required</div>
            <div style={{ fontSize: "13px", marginBottom: "8px" }}>
              Please upload your resume before applying.
            </div>
            <button
              onClick={() => { navigate("/profile"); toast.dismiss(); }}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "6px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                fontSize: "13px",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              📤 Upload Resume
            </button>
          </div>
        </div>,
        { autoClose: 6000, position: "top-center" }
      );
      return;
    }

    try {
      setApplying(true);

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/applications/${jobId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setApplied(true);
      toast.success("Applied successfully!", { position: "top-center" });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Application failed",
        { position: "top-center" }
      );
    } finally {
      setApplying(false);
    }
  };

  /* ================= LOADING STATE ================= */
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#f5f7fb",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: "16px"
      }}>
        <div style={{
          width: "44px", height: "44px",
          border: "4px solid #e2e8f0",
          borderTop: "4px solid #667eea",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite"
        }} />
        <p style={{ color: "#64748b", fontSize: "15px" }}>Loading job details...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!job) {
    return (
      <div style={{ padding: "60px", textAlign: "center", color: "#64748b" }}>
        Job not found
      </div>
    );
  }

  /* ================= RENDER ================= */
  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fb", padding: "40px 20px" }}>
      <ToastContainer position="top-center" />
      <div style={{
        maxWidth: "900px", margin: "0 auto",
        background: "#ffffff", padding: "36px",
        borderRadius: "20px", boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
      }}>

        {/* ── Header ── */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
          {job.companyLogo ? (
            <img
              src={job.companyLogo}
              alt="Company Logo"
              style={{ width: "70px", height: "70px", objectFit: "contain", borderRadius: "12px", border: "1px solid #e2e8f0", flexShrink: 0 }}
            />
          ) : (
            <div style={{
              width: "70px", height: "70px", borderRadius: "12px", flexShrink: 0,
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "24px", fontWeight: "700"
            }}>
              {job.companyName?.[0]?.toUpperCase()}
            </div>
          )}
          <div>
            <h2 style={{ color: "#667eea", marginBottom: "6px", fontWeight: "800" }}>
              {job.jobTitle}
            </h2>
            <h4 style={{ color: "#495057", margin: 0, fontWeight: "600" }}>
              {job.companyName}
            </h4>
          </div>
        </div>

        {/* ── Closed Warning ── */}
        {job.status === "closed" && (
          <div style={{
            background: "#fee2e2", color: "#991b1b",
            padding: "12px 16px", borderRadius: "10px",
            marginBottom: "20px", fontWeight: "600", fontSize: "14px"
          }}>
            🚫 This job is no longer accepting applications
          </div>
        )}

        {/* ── Info Grid ── */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px", marginBottom: "28px"
        }}>
          {[
            ["📍 Location",   job.location],
            ["🖥 Work Mode",  job.workMode],
            ["💼 Job Type",   job.jobType],
            ["📊 Status",     job.status || "open"],
            ["💰 Salary",     job.salaryMin != null
              ? `₹${job.salaryMin.toLocaleString()} – ₹${job.salaryMax?.toLocaleString() || "?"}`
              : "Not specified"],
            ["🎓 Experience", job.experienceMin != null
              ? `${job.experienceMin} – ${job.experienceMax ?? "+"} yrs`
              : "Not specified"],
            ["📅 Deadline",   job.deadline
              ? new Date(job.deadline).toLocaleDateString()
              : "No deadline"],
          ].map(([label, value]) => (
            <div key={label} style={{
              background: "#f8fafc", borderRadius: "10px",
              padding: "12px 14px", border: "1px solid #e2e8f0"
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

        <hr style={{ margin: "24px 0", borderColor: "#f0f0f0" }} />

        {/* ── Description ── */}
        <h4 style={{ fontWeight: "700", color: "#1e293b", marginBottom: "10px" }}>Description</h4>
        <p style={{ lineHeight: "1.8", color: "#475569", marginBottom: "24px" }}>
          {job.description}
        </p>

        {/* ── Requirements ── */}
        {job.requirements && (
          <>
            <h4 style={{ fontWeight: "700", color: "#1e293b", marginBottom: "10px" }}>Requirements</h4>
            <p style={{ lineHeight: "1.8", color: "#475569", marginBottom: "24px" }}>
              {job.requirements}
            </p>
          </>
        )}

        {/* ── Benefits ── */}
        {job.benefits?.length > 0 && (
          <>
            <h4 style={{ fontWeight: "700", color: "#1e293b", marginBottom: "12px" }}>Benefits</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
              {job.benefits.map((b, i) => (
                <span key={i} style={{
                  background: "#ecfdf5", color: "#059669",
                  padding: "5px 14px", borderRadius: "20px",
                  fontSize: "13px", fontWeight: "500",
                  border: "1px solid #a7f3d0"
                }}>
                  {b}
                </span>
              ))}
            </div>
          </>
        )}

        {/* ── Apply Button ── */}
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <button
            disabled={job.status === "closed" || applying || applied}
            onClick={handleApply}
            style={{
              padding: "14px 40px",
              fontSize: "16px",
              fontWeight: "700",
              borderRadius: "12px",
              border: "none",
              cursor: (job.status === "closed" || applied) ? "not-allowed" : "pointer",
              background: job.status === "closed"
                ? "#e5e7eb"
                : applied
                  ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: job.status === "closed" ? "#6b7280" : "white",
              boxShadow: (job.status === "closed" || applied)
                ? "none"
                : "0 8px 25px rgba(102,126,234,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              if (job.status !== "closed" && !applied && !applying) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 35px rgba(102,126,234,0.5)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = (job.status === "closed" || applied)
                ? "none"
                : "0 8px 25px rgba(102,126,234,0.4)";
            }}
          >
            {job.status === "closed"
              ? "Applications Closed"
              : applied
                ? "✓ Applied"
                : applying
                  ? "Applying..."
                  : "Apply Now"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default JobView;