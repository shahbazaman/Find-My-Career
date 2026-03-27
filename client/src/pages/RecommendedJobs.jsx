import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CgWorkAlt } from "react-icons/cg";
import { BiRupee } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { BsStar, BsStarFill, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecommendedJobs = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [allCards, setAllCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasResume, setHasResume] = useState(false);
  const [prefsUsed, setPrefsUsed] = useState({ roles: [], locations: [], skills: "" });
  const cardsRef = useRef(null);
  const cardsPerPage = 9;

  // ── fetch resume check ──
  useEffect(() => {
    const checkResume = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const payload = JSON.parse(atob(token.split(".")[1]));
        const userId = payload.id || payload._id;
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`);
        setHasResume(!!res.data?.resumeUrl);
      } catch (err) {
        console.error("Failed to check resume", err);
      }
    };
    checkResume();
  }, []);

  // ── fetch jobs + preferences + applied + saved ──
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const payload = token ? JSON.parse(atob(token.split(".")[1])) : null;
        const userId = payload?.id || payload?._id;

        const [jobsRes, appliedRes, savedRes, prefsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs`),
          token
            ? axios.get(`${import.meta.env.VITE_API_BASE_URL}/applications/my`, {
                headers: { Authorization: `Bearer ${token}` }
              })
            : Promise.resolve({ data: [] }),
          token
            ? axios.get(`${import.meta.env.VITE_API_BASE_URL}/saved-jobs`, {
                headers: { Authorization: `Bearer ${token}` }
              })
            : Promise.resolve({ data: [] }),
          userId
            ? fetch(`${import.meta.env.VITE_API_BASE_URL}/preferences/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
              }).then(r => r.json())
            : Promise.resolve({})
        ]);

        // applied map
        const appliedMap = {};
        if (Array.isArray(appliedRes.data)) {
          appliedRes.data.forEach(app => {
            if (app.job) appliedMap[app.job] = app.status;
          });
        }

        // saved set
        const savedJobIds = new Set(
          Array.isArray(savedRes.data)
            ? savedRes.data.map(s => s.job?._id || s.job)
            : []
        );

        // map jobs
        const mappedJobs = jobsRes.data.jobs.map(job => {
          const status = appliedMap[job._id];
          return {
            _id: job._id,
            company: job.companyName,
            postion: job.jobTitle,
            skills: job.requirements,
            salary: `${job.salaryMin || 0}₹ - ${job.salaryMax || 0}₹`,
            experiance: `${job.experienceMin || 0}-${job.experienceMax || 0}`,
            location: job.location,
            date: job.createdAt?.slice(0, 10),
            applied: ["Applied","Shortlisted","Interview Scheduled","Rejected","Hired"].includes(status),
            applicationStatus: status || null,
            saved: savedJobIds.has(job._id),
            rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1)
          };
        });

        // parse preferences
        const prefs = prefsRes || {};
        const roleList     = prefs.roles     ? prefs.roles.split(",").map(r => r.trim().toLowerCase())     : [];
        const locationList = prefs.locations ? prefs.locations.split(",").map(l => l.trim().toLowerCase()) : [];
        const skillsList   = prefs.skills    ? prefs.skills.split(",").map(s => s.trim().toLowerCase())    : [];

        setPrefsUsed({
          roles:     prefs.roles     ? prefs.roles.split(",").map(r => r.trim())     : [],
          locations: prefs.locations ? prefs.locations.split(",").map(l => l.trim()) : [],
          skills:    prefs.skills || ""
        });

        // filter
        const filtered = mappedJobs.filter(job => {
          const roleMatch     = roleList.length === 0     || roleList.some(r => job.postion.toLowerCase().includes(r));
          const locationMatch = locationList.length === 0 || locationList.some(l => job.location.toLowerCase().includes(l));
          const skillsMatch   = skillsList.length === 0   || skillsList.some(s => job.skills?.toLowerCase().includes(s));
          return roleMatch && locationMatch && skillsMatch;
        });

        setAllCards(mappedJobs);
        setCards(filtered);
      } catch (err) {
        console.error("Error loading recommended jobs", err);
        toast.error("Failed to load recommended jobs");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // ── pagination ──
  const totalPages = Math.ceil(cards.length / cardsPerPage) || 1;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const token = localStorage.getItem("token");

  // ── apply ──
  const toggleApply = async (jobId) => {
    if (!hasResume) {
      toast.warning(
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "22px" }}>📄</span>
          <div>
            <div style={{ fontWeight: "700", marginBottom: "4px" }}>Resume Required</div>
            <div style={{ fontSize: "13px", marginBottom: "8px" }}>Please upload your resume before applying.</div>
            <button
              onClick={() => { navigate("/upload-resume"); toast.dismiss(); }}
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white", border: "none", padding: "6px 16px",
                borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "13px"
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
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/applications/${jobId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCards(prev => prev.map(c => c._id === jobId ? { ...c, applied: true } : c));
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to apply");
    }
  };

  // ── save ──
  const toggleSave = async (jobId) => {
    if (!token) { toast.warning("Please login to save jobs"); return; }
    const isSaved = cards.find(c => c._id === jobId)?.saved;
    setCards(prev => prev.map(c => c._id === jobId ? { ...c, saved: !c.saved } : c));
    try {
      if (isSaved) {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/saved-jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.info("Job removed from saved");
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/saved-jobs/${jobId}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Job saved! ✨");
      }
    } catch (err) {
      setCards(prev => prev.map(c => c._id === jobId ? { ...c, saved: !c.saved } : c));
      toast.error(err?.response?.data?.message || "Failed to update saved jobs");
    }
  };

  const renderStarBadge = (rating) => {
    const fullStars = Math.floor(rating);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={{ color: i < fullStars ? "#ffc107" : "#e4e5e9" }}>
            {i < fullStars ? <BsStarFill /> : <BsStar />}
          </span>
        ))}
        <span style={{ fontSize: "13px", fontWeight: 600 }}>{rating}</span>
      </div>
    );
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
      padding: "40px 20px"
    }}>
      <ToastContainer position="top-center" />
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "20px",
          flexWrap: "wrap", gap: "15px"
        }}>
          <div>
            <h1 style={{
              color: "white", fontSize: "clamp(24px, 5vw, 36px)",
              fontWeight: "700", textShadow: "2px 2px 4px rgba(0,0,0,0.2)", margin: 0
            }}>
              ✨ Recommended Jobs
            </h1>
            {!loading && (
              <p style={{ color: "rgba(255,255,255,0.7)", margin: "6px 0 0 0", fontSize: "14px" }}>
                {cards.length} job{cards.length !== 1 ? "s" : ""} matched your preferences
              </p>
            )}
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/job-preference")}
              style={{
                padding: "10px 18px",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(8px)",
                color: "white", border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50px", cursor: "pointer",
                fontSize: "14px", fontWeight: "600",
                display: "flex", alignItems: "center", gap: "7px"
              }}
            >
              ⚙️ Edit Preferences
            </button>
            <button
              onClick={() => navigate("/jobs")}
              style={{
                padding: "10px 18px", background: "white",
                color: "#667eea", border: "none", borderRadius: "50px",
                cursor: "pointer", fontSize: "14px", fontWeight: "600",
                display: "flex", alignItems: "center", gap: "7px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
              }}
            >
              ← All Jobs
            </button>
          </div>
        </div>

        {/* ── Active preference tags ── */}
        {!loading && (prefsUsed.roles.length > 0 || prefsUsed.locations.length > 0 || prefsUsed.skills) && (
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "8px",
            marginBottom: "24px", alignItems: "center"
          }}>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontWeight: "500" }}>
              Filtering by:
            </span>
            {prefsUsed.roles.map(r => (
              <span key={r} style={prefTagStyle("#6366f1")}>💼 {r}</span>
            ))}
            {prefsUsed.locations.map(l => (
              <span key={l} style={prefTagStyle("#a855f7")}>📍 {l}</span>
            ))}
            {prefsUsed.skills && prefsUsed.skills.split(",").map(s => (
              <span key={s} style={prefTagStyle("#10b981")}>🛠 {s.trim()}</span>
            ))}
          </div>
        )}

        {/* ── Loading ── */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div style={{
              width: "48px", height: "48px", border: "4px solid rgba(255,255,255,0.2)",
              borderTop: "4px solid white", borderRadius: "50%",
              animation: "spin 0.8s linear infinite", margin: "0 auto 16px"
            }} />
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px" }}>
              Finding your best matches...
            </p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>

        ) : cards.length === 0 ? (
          /* ── Empty state ── */
          <div style={{
            textAlign: "center", padding: "80px 20px",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <div style={{ fontSize: "64px", marginBottom: "16px" }}>🔍</div>
            <h3 style={{ color: "white", fontWeight: "700", marginBottom: "8px" }}>
              No matches found
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "24px" }}>
              No jobs matched your current preferences. Try updating them.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => navigate("/job-preference")}
                style={{
                  padding: "12px 24px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white", border: "none", borderRadius: "50px",
                  cursor: "pointer", fontWeight: "600", fontSize: "15px"
                }}
              >
                ⚙️ Update Preferences
              </button>
              <button
                onClick={() => navigate("/jobs")}
                style={{
                  padding: "12px 24px", background: "white",
                  color: "#667eea", border: "none", borderRadius: "50px",
                  cursor: "pointer", fontWeight: "600", fontSize: "15px"
                }}
              >
                View All Jobs
              </button>
            </div>
          </div>

        ) : (
          /* ── Cards Grid ── */
          <>
            <div
              ref={cardsRef}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "25px", marginBottom: "40px", scrollMarginTop: "90px"
              }}
            >
              {currentCards.map((job) => (
                <div
                  key={job._id}
                  style={{
                    background: "white", borderRadius: "20px", padding: "25px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    transition: "all 0.3s ease", cursor: "pointer",
                    position: "relative", overflow: "hidden"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
                  }}
                >
                  {/* decorative blob */}
                  <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: "100px", height: "100px",
                    background: "linear-gradient(135deg, #667eea20 0%, #764ba220 100%)",
                    borderRadius: "0 0 0 100px"
                  }} />

                  {/* ── company + title ── */}
                  <div style={{ marginBottom: "15px" }}>
                    <h3 style={{ color: "#667eea", fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
                      {job.company}
                    </h3>
                    <span style={{
                      display: "inline-block", padding: "6px 14px",
                      background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
                      borderRadius: "20px", fontSize: "13px", fontWeight: "600",
                      color: "#667eea", border: "1px solid #667eea30"
                    }}>
                      {job.postion}
                    </span>
                  </div>

                  {/* ── skills snippet ── */}
                  <p style={{ fontSize: "13px", color: "#6c757d", marginBottom: "15px", lineHeight: "1.6" }}>
                    {(() => {
                      const words = job.skills?.split(" ") || [];
                      if (words.length <= 25) return job.skills;
                      const preview = words.slice(0, 10).join(" ").trim();
                      return (
                        <>
                          {preview}
                          <span
                            onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); navigate(`/jobs/${job._id}`); }}
                            style={{ color: "#667eea", fontWeight: "600", cursor: "pointer", marginLeft: "4px" }}
                          >
                            ...read more
                          </span>
                        </>
                      );
                    })()}
                  </p>

                  {/* ── salary / exp / location chips ── */}
                  <div style={{ height: "80px", display: "flex" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "15px", width: "100%" }}>
                      <div style={chipStyle}>
                        {job.salary !== "0₹ - 0₹" && (
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <BiRupee size={16} color="#667eea" />
                            <span style={{ fontWeight: "600" }}>{job.salary}</span>
                          </div>
                        )}
                      </div>
                      <div style={chipStyle}>
                        <CgWorkAlt size={16} color="#667eea" />
                        <span style={{ fontWeight: "600" }}>{job.experiance} years</span>
                      </div>
                      <div style={chipStyle}>
                        <IoLocationOutline size={16} color="#667eea" />
                        <span style={{ fontWeight: "600" }}>{job.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* ── action row ── */}
                  <div style={{ borderTop: "1px solid #e9ecef", paddingTop: "15px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                    <div style={{ flexShrink: 0 }}>{renderStarBadge(job.rating)}</div>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <button
                        onClick={() => { window.scrollTo({ top: 0, behavior: "instant" }); navigate(`/jobs/${job._id}`); }}
                        style={btnStyle("#0d6efd", "#2563eb")}
                      >
                        View
                      </button>
                      <button
                        disabled={job.applied}
                        onClick={() => toggleApply(job._id)}
                        style={{
                          ...btnStyle(job.applied ? "#11998e" : "#667eea", job.applied ? "#38ef7d" : "#764ba2"),
                          cursor: job.applied ? "not-allowed" : "pointer"
                        }}
                      >
                        {job.applied ? "✓ Applied" : "Apply"}
                      </button>
                      <button
                        onClick={() => toggleSave(job._id)}
                        style={{
                          width: "36px", height: "36px", borderRadius: "10px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          border: job.saved ? "2px solid #ffc107" : "2px solid #e9ecef",
                          cursor: "pointer",
                          background: job.saved ? "#fff8e1" : "white",
                          color: job.saved ? "#ffc107" : "#6c757d",
                          transition: "all 0.3s ease", padding: "0"
                        }}
                      >
                        {job.saved ? <BsBookmarkFill /> : <BsBookmark />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "25px" }}>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={pageBtn(currentPage === 1)}>← Previous</button>
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i + 1} onClick={() => handlePageChange(i + 1)} style={pageBtn(false, currentPage === i + 1)}>{i + 1}</button>
                ))}
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={pageBtn(currentPage === totalPages)}>Next →</button>
              </div>
            )}

            <div style={{ textAlign: "center", color: "white", fontSize: "14px", fontWeight: "500" }}>
              Page {currentPage} of {totalPages} • Showing {cards.length === 0 ? 0 : indexOfFirstCard + 1}–{Math.min(indexOfLastCard, cards.length)} of {cards.length} jobs
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ── shared styles ── */
const prefTagStyle = (color) => ({
  padding: "5px 12px", borderRadius: "20px", fontSize: "12px",
  fontWeight: "600", color: "white",
  background: color, opacity: 0.9
});

const chipStyle = {
  display: "flex", alignItems: "center", gap: "5px",
  fontSize: "13px", color: "#495057",
  background: "#f8f9fa", padding: "6px 12px",
  borderRadius: "8px", width: "30%"
};

const btnStyle = (from, to) => ({
  padding: "6px 14px", fontSize: "12px", height: "36px",
  borderRadius: "10px", border: "none", cursor: "pointer",
  background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
  color: "white", fontWeight: "600",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease", display: "flex",
  alignItems: "center", justifyContent: "center", whiteSpace: "nowrap"
});

const pageBtn = (disabled, active = false) => ({
  padding: "12px 20px", border: "none", borderRadius: "12px", fontWeight: "600",
  cursor: disabled ? "not-allowed" : "pointer",
  background: disabled ? "#e9ecef" : active ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "white",
  color: disabled ? "#adb5bd" : active ? "white" : "#667eea",
  boxShadow: disabled ? "none" : "0 4px 15px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease", minWidth: "48px"
});

export default RecommendedJobs;