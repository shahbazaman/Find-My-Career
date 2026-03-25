import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  FaBriefcase, FaMapMarkerAlt, FaBuilding,
  FaTimes, FaClock, FaBookmark, FaRegBookmark
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function JobList() {
  const [jobs, setJobs]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [saved, setSaved]       = useState({});
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [currentPage, setCurrentPage]   = useState(1);
  const CARDS_PER_PAGE = 9;
  const [searchParams, setSearchParams] = useSearchParams();
  const titleFilter    = searchParams.get("title")    || "";
const locationFilter = searchParams.get("location") || "";
const skillsFilter   = searchParams.get("skills")   || "";
  const navigate    = useNavigate();

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (titleFilter)    params.title    = titleFilter;
    if (locationFilter) params.location = locationFilter;
    if (skillsFilter)   params.skills   = skillsFilter;
    if (search)         params.search   = search;

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/jobs`, { params })
      .then((res) => setJobs(res.data.jobs || []))
      .catch((err) => console.error("JobList fetch error:", err))
      .finally(() => setLoading(false));
  }, [titleFilter, locationFilter, skillsFilter, search]);

  const clearFilter = () => setSearchParams({});
useEffect(() => {
  const fetchApplied = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/applications/my`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (Array.isArray(res.data)) {
        const ids = new Set(res.data.map(app => app.job?._id || app.job));
        setAppliedJobs(ids);
      }
    } catch (err) {
      console.error("Failed to fetch applied jobs", err);
    }
  };
  fetchApplied();
}, []);
  const toggleSave = async (e, jobId) => {
  e.stopPropagation();
  const token = localStorage.getItem("token");
  if (!token) { toast.warning("Please login to save jobs"); return; }

  const isSaved = saved[jobId];

  // Optimistic update
  setSaved((prev) => ({ ...prev, [jobId]: !prev[jobId] }));

  try {
    if (isSaved) {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/saved-jobs/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.info("Job removed from saved");
    } else {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/saved-jobs/${jobId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Job saved! ✨");
    }
  } catch (err) {
    // Revert on failure
    setSaved((prev) => ({ ...prev, [jobId]: !prev[jobId] }));
    toast.error(err?.response?.data?.message || "Failed to update saved jobs");
  }
};
// Reset to page 1 whenever jobs list changes
useEffect(() => { setCurrentPage(1); }, [jobs]);
useEffect(() => {
  const fetchSaved = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/saved-jobs`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (Array.isArray(res.data)) {
        const savedMap = {};
        res.data.forEach(s => {
          const id = s.job?._id || s.job;
          if (id) savedMap[id] = true;
        });
        setSaved(savedMap);
      }
    } catch (err) {
      console.error("Failed to fetch saved jobs", err);
    }
  };
  fetchSaved();
}, []);
const totalPages     = Math.ceil(jobs.length / CARDS_PER_PAGE);
const showPagination = jobs.length > CARDS_PER_PAGE;
const paginatedJobs  = jobs.slice(
  (currentPage - 1) * CARDS_PER_PAGE,
  currentPage * CARDS_PER_PAGE
);
  return (
    <Container className="mt-4 mb-5">
  <ToastContainer position="top-center" />
    <style>{`
  @media (max-width: 576px) {
    h2 { font-size: 1.2rem !important; }
    .card-company   { font-size: 0.82rem !important; }
    .card-title-pill { font-size: 0.75rem !important; }
    .card-req        { font-size: 0.75rem !important; }
    .card-chip       { font-size: 0.7rem  !important; }
    .card-badge      { font-size: 0.68rem !important; }
    .apply-btn       { font-size: 0.72rem !important; padding: 5px 10px !important; }
  }
`}</style>
      {/* ── Header ── */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
  <div>
    <h2 className="fw-bold mb-0">
      {titleFilter ? (
        <>Jobs for <span style={{ color: "#764ba2" }}>{titleFilter}</span></>
      ) : (
        "All Jobs"
      )}
    </h2>
    {!loading && (
      <small className="text-muted">
        {jobs.length} job{jobs.length !== 1 ? "s" : ""} found
      </small>
    )}
  </div>

  <div className="d-flex align-items-center gap-2 flex-wrap">
    {titleFilter && (
      <Button
        variant="outline-secondary" size="sm"
        className="rounded-pill d-flex align-items-center gap-2"
        onClick={clearFilter}
      >
        <FaTimes size={11} /> Clear filter
      </Button>
    )}
    <button
      onClick={() => navigate("/job-preference")}
      style={{
        display: "flex", alignItems: "center", gap: "0.5rem",
        padding: "8px 16px", borderRadius: "50px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white", border: "none", fontWeight: 600,
        fontSize: "0.85rem", cursor: "pointer", whiteSpace: "nowrap",
        boxShadow: "0 4px 12px rgba(102,126,234,0.3)"
      }}
    >
      ⚙️ Preference Settings
    </button>
  </div>
</div>

      {/* ── Search bar ── */}
      {!titleFilter && (
        <Form.Control
          type="text"
          placeholder="Search by title, company, skills..."
          className="mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderRadius: "12px", padding: "12px 16px" }}
        />
      )}

      {/* ── Job Cards ── */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <FaBriefcase size={40} className="mb-3" />
          <p>No jobs found{titleFilter ? ` for "${titleFilter}"` : ""}.</p>
          {titleFilter && (
            <Button variant="primary" onClick={clearFilter}>View all jobs</Button>
          )}
        </div>
      ) : (
        <Row className="g-4">
          {paginatedJobs.map((job) => (
            <Col key={job._id} xs={12} md={6} lg={4}>
              <Card
                className="h-100 border-0"
                style={{
                  borderRadius: "20px",
                  cursor: "pointer",
                  background: "#fff",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  overflow: "hidden",
                  position: "relative"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.13)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                }}
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                {/* top-right decorative blob */}
                <div style={{
                  position: "absolute", top: "-30px", right: "-30px",
                  width: "100px", height: "100px",
                  borderRadius: "50%",
                  background: "rgba(118,75,162,0.07)",
                  pointerEvents: "none"
                }} />

                <Card.Body className="p-4" style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                  {/* ── Row 1: company + bookmark ── */}
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <p className="card-company" style={{
                        margin: 0, fontWeight: "700", fontSize: "1rem",
                        color: "#4f46e5"
                      }}>
                        {job.companyName || "Company"}
                      </p>
                    </div>
                    {/* bookmark button */}
                    <div
                      onClick={(e) => toggleSave(e, job._id)}
                      style={{
                        width: "34px", height: "34px", borderRadius: "50%",
                        border: "1.5px solid #e5e7eb",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", flexShrink: 0,
                        color: saved[job._id] ? "#764ba2" : "#9ca3af",
                        transition: "all 0.2s"
                      }}
                    >
                      {saved[job._id] ? <FaBookmark size={13} /> : <FaRegBookmark size={13} />}
                    </div>
                  </div>

                  {/* ── Row 2: job title pill ── */}
                  <div>
                    <span className="card-title-pill" style={{
                      display: "inline-block",
                      background: "#f3f4f6",
                      color: "#374151",
                      borderRadius: "20px",
                      padding: "5px 14px",
                      fontSize: "0.85rem",
                      fontWeight: "600"
                    }}>
                      {job.jobTitle}
                    </span>
                  </div>

                  {/* ── Row 3: requirements snippet ── */}
                  {job.requirements && (
                    <p className="card-req" style={{
                      margin: 0, fontSize: "0.85rem",
                      color: "#6b7280",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden"
                    }}>
                      {job.requirements}
                    </p>
                  )}

                  {/* ── Row 4: salary | experience | location chips ── */}
                  <div className="d-flex flex-wrap gap-2">
                    {job.salary && (
                      <span className="card-chip" style={chipStyle}>
                        ₹ {job.salary}
                      </span>
                    )}
                    {job.experience && (
                      <span className="card-chip" style={chipStyle}>
                        <FaClock size={11} style={{ marginRight: "4px" }} />
                        {job.experience}
                      </span>
                    )}
                    {job.location && (
                      <span className="card-chip" style={chipStyle}>
                        <FaMapMarkerAlt size={11} style={{ marginRight: "4px" }} />
                        {job.location}
                      </span>
                    )}
                  </div>

                  {/* ── Row 5: job type badge + View/Apply buttons ── */}
                  <div className="d-flex justify-content-between align-items-center mt-auto pt-2"
                    style={{ borderTop: "1px solid #f3f4f6" }}>

                    {job.jobType ? (
                      <span className="card-badge" style={{
                        fontSize: "0.78rem", fontWeight: "600",
                        color: "#764ba2", background: "#f5f3ff",
                        borderRadius: "8px", padding: "4px 10px"
                      }}>
                        {job.jobType}
                      </span>
                    ) : <span />}

                    <div className="d-flex gap-2">
                      <Button
                          className="apply-btn"
                          size="sm"
                          disabled={appliedJobs.has(job._id)}
                          onClick={(e) => {
                          e.stopPropagation();
                          if (!appliedJobs.has(job._id)) navigate(`/jobs/${job._id}`);
                        }}
                        style={{
                          background: appliedJobs.has(job._id)
                            ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
                            : "linear-gradient(135deg, #667eea, #764ba2)",
                          border: "none", borderRadius: "10px",
                          fontWeight: "600", padding: "6px 16px",
                          fontSize: "0.82rem",
                          cursor: appliedJobs.has(job._id) ? "not-allowed" : "pointer"
                        }}
                      >
                        {appliedJobs.has(job._id) ? "✓ Applied" : "Apply"}
                      </Button>                    
                    </div>
                  </div>

                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
        {/* ── Pagination ── */}
{showPagination && (
  <div className="d-flex justify-content-center align-items-center gap-2 mt-4 flex-wrap">
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      style={{
        padding: "10px 18px", border: "none", borderRadius: "12px",
        background: currentPage === 1 ? "#e9ecef" : "white",
        color: currentPage === 1 ? "#adb5bd" : "#667eea",
        cursor: currentPage === 1 ? "not-allowed" : "pointer",
        fontWeight: "600", boxShadow: currentPage === 1 ? "none" : "0 4px 15px rgba(0,0,0,0.1)"
      }}
    >
      ← Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
        key={i + 1}
        onClick={() => setCurrentPage(i + 1)}
        style={{
          padding: "10px 15px", border: "none", borderRadius: "12px",
          background: currentPage === i + 1
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "white",
          color: currentPage === i + 1 ? "white" : "#667eea",
          fontWeight: "600", cursor: "pointer", minWidth: "44px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
        }}
      >
        {i + 1}
      </button>
    ))}

    <button
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      style={{
        padding: "10px 18px", border: "none", borderRadius: "12px",
        background: currentPage === totalPages ? "#e9ecef" : "white",
        color: currentPage === totalPages ? "#adb5bd" : "#667eea",
        cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        fontWeight: "600", boxShadow: currentPage === totalPages ? "none" : "0 4px 15px rgba(0,0,0,0.1)"
      }}
    >
      Next →
    </button>
  </div>
)}
    </Container>
  );
}

/* ── shared chip style ── */
const chipStyle = {
  display: "inline-flex",
  alignItems: "center",
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "5px 12px",
  fontSize: "0.8rem",
  fontWeight: "500",
  color: "#374151"
};