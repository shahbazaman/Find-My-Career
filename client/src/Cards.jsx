import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CgWorkAlt } from "react-icons/cg";
import { BiRupee } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import {
  BsFilter,
  BsX,
  BsStar,
  BsStarFill,
  BsBookmark,
  BsBookmarkFill
} from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cards = () => {
    const navigate = useNavigate();
  const [allCards, setAllCards] = useState([]);
  const [cards, setCards] = useState([]);

  const [filters, setFilters] = useState({
    company: "",
    role: "",
    skills: "",
    salary: "",
    experience: "",
    location: "",
    date: "",
    applied: "",
    saved: ""
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

useEffect(() => {
  const fetchJobsAndApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const [jobsRes, appliedRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/jobs`),
        token
          ? axios.get(`${import.meta.env.VITE_API_BASE_URL}/applications/my`, {
              headers: { Authorization: `Bearer ${token}` }
            })
          : Promise.resolve({ data: [] })
      ]);
            const appliedMap = {};
      if (Array.isArray(appliedRes.data)) {
        appliedRes.data.forEach(app => {
          if (app.job) appliedMap[app.job] = app.status;
        });
      }
      const appliedJobIds = Array.isArray(appliedRes.data)
  ? appliedRes.data.map(app => app.job)
  : [];

const mappedJobs = jobsRes.data.jobs.map(job => {
  const status = appliedMap[job._id];

  return {
    _id: job._id,
    company: job.companyName,
    postion: job.jobTitle,
    skills: job.requirements,
    salary: `${job.salaryMin || 0}$ - ${job.salaryMax || 0}$`,
    experiance: `${job.experienceMin || 0}-${job.experienceMax || 0}`,
    location: job.location,
    date: job.createdAt?.slice(0, 10),
    applied: [
      "Applied",
      "Shortlisted",
      "Interview Scheduled",
      "Rejected",
      "Hired"
    ].includes(status),
    applicationStatus: status || null,
    saved: false,
    rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1)
  };
});

      setAllCards(mappedJobs);
      setCards(mappedJobs);
    } catch (err) {
      console.error("Error fetching jobs or applications", err);
    }
  };

  fetchJobsAndApplications();
}, []);



  /* ================= FILTERING ================= */
  useEffect(() => {
    let filtered = [...allCards];

    if (filters.company)
      filtered = filtered.filter((c) =>
        c.company.toLowerCase().includes(filters.company.toLowerCase())
      );

    if (filters.role)
      filtered = filtered.filter((c) =>
        c.postion.toLowerCase().includes(filters.role.toLowerCase())
      );

    if (filters.skills)
      filtered = filtered.filter((c) =>
        c.skills.toLowerCase().includes(filters.skills.toLowerCase())
      );

    if (filters.salary)
      filtered = filtered.filter((c) =>
        c.salary.toLowerCase().includes(filters.salary.toLowerCase())
      );

    if (filters.experience)
      filtered = filtered.filter((c) =>
        c.experiance.toLowerCase().includes(filters.experience.toLowerCase())
      );

    if (filters.location)
      filtered = filtered.filter((c) =>
        c.location.toLowerCase().includes(filters.location.toLowerCase())
      );

    if (filters.date)
      filtered = filtered.filter((c) => c.date?.includes(filters.date));

    if (filters.applied === "true")
      filtered = filtered.filter((c) => c.applied);

    if (filters.saved === "true")
      filtered = filtered.filter((c) => c.saved);

    setCards(filtered);
    setCurrentPage(1);
  }, [filters, allCards]);

  /* ================= PAGINATION ================= */
  const totalPages = Math.ceil(cards.length / cardsPerPage) || 1;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  /* ================= HANDLERS ================= */
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      company: "",
      role: "",
      skills: "",
      salary: "",
      experience: "",
      location: "",
      date: "",
      applied: "",
      saved: ""
    });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const token = localStorage.getItem("token");

const toggleApply = async (jobId) => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/applications/${jobId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    setCards(prev =>
      prev.map(c =>
        c._id === jobId ? { ...c, applied: true } : c
      )
    );
    setAllCards(prev =>
      prev.map(c =>
        c._id === jobId ? { ...c, applied: true } : c
      )
    );
  } catch (err) {
  toast.error(err?.response?.data?.message || "Failed to apply");
}
};


  const toggleSave = (jobId) => {
    setCards((prev) =>
      prev.map((c) => (c._id === jobId ? { ...c, saved: !c.saved } : c))
    );
    setAllCards((prev) =>
      prev.map((c) => (c._id === jobId ? { ...c, saved: !c.saved } : c))
    );
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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,  #060729ff 0%, #0c248dff 100%)",
        padding: "40px 20px"
      }}
    ><ToastContainer position="top-center" />
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            flexWrap: "wrap",
            gap: "15px"
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: "clamp(24px, 5vw, 36px)",
              fontWeight: "700",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
              margin: 0
            }}
          >
            🚀 Current Openings
          </h1>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            style={{
              padding: "12px 24px",
              background: "white",
              color: "#667eea",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => (e.target.style.transform = "translateY(-2px)")}
            onMouseOut={(e) => (e.target.style.transform = "translateY(0)")}
          >
            <BsFilter size={20} />
            {isFilterOpen ? "Close Filters" : "Filters"}
          </button>
        </div>

        {/* Filter Panel */}
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            height: "100vh",
            width: "350px",
            maxWidth: "90vw",
            background: "white",
            boxShadow: "-5px 0 25px rgba(0,0,0,0.3)",
            padding: "30px 25px",
            transform: isFilterOpen ? "translateX(0)" : "translateX(100%)",
            transition:
              "transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            zIndex: 1000,
            overflowY: "auto"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px"
            }}
          >
            <h3
              style={{ color: "#667eea", fontWeight: "700", margin: 0 }}
            >
              Filter Jobs
            </h3>
            <button
              onClick={() => setIsFilterOpen(false)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "28px",
                cursor: "pointer",
                color: "#999"
              }}
            >
              <BsX />
            </button>
          </div>

          <p
            style={{
              fontSize: "14px",
              color: "#6c757d",
              marginBottom: "20px"
            }}
          >
            Narrow down your perfect opportunity
          </p>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {[
              { name: "company", placeholder: "🏢 Company" },
              { name: "role", placeholder: "💼 Role / Position" },
              { name: "skills", placeholder: "🛠️ Skills" },
              { name: "salary", placeholder: "💰 Salary (e.g., 20L)" },
              { name: "experience", placeholder: "📊 Experience (e.g., 2-4)" },
              { name: "location", placeholder: "📍 Location" },
              { name: "date", placeholder: "📅 Date (YYYY-MM-DD)" }
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                placeholder={field.placeholder}
                value={filters[field.name]}
                onChange={handleFilterChange}
                style={{
                  padding: "12px 15px",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  fontSize: "14px",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            ))}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                marginTop: "10px"
              }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#495057"
                }}
              >
                Applied Status
              </label>
              <select
                name="applied"
                value={filters.applied}
                onChange={handleFilterChange}
                style={{
                  padding: "12px",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  fontSize: "14px"
                }}
              >
                <option value="">All</option>
                <option value="true">Only Applied</option>
              </select>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#495057"
                }}
              >
                Saved Jobs
              </label>
              <select
                name="saved"
                value={filters.saved}
                onChange={handleFilterChange}
                style={{
                  padding: "12px",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  fontSize: "14px"
                }}
              >
                <option value="">All</option>
                <option value="true">Only Saved</option>
              </select>
            </div>
          </div>

          <button
            onClick={clearFilters}
            style={{
              marginTop: "25px",
              width: "100%",
              padding: "14px",
              background:
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)"
            }}
          >
            Clear All Filters
          </button>
        </div>

        {isFilterOpen && (
          <div
            onClick={() => setIsFilterOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 999,
              backdropFilter: "blur(4px)"
            }}
          />
        )}

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "25px",
            marginBottom: "40px"
          }}
        >
          {currentCards.map((job) => (
            <div
              key={job._id}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "25px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(0,0,0,0.25)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,0,0,0.15)";
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "100px",
                  height: "100px",
                  background:
                    "linear-gradient(135deg, #667eea20 0%, #764ba220 100%)",
                  borderRadius: "0 0 0 100px"
                }}
              ></div>

              <div style={{ marginBottom: "15px" }}>
                <h3
                  style={{
                    color: "#667eea",
                    fontSize: "20px",
                    fontWeight: "700",
                    marginBottom: "8px"
                  }}
                >
                  {job.company}
                </h3>
                <span
                  style={{
                    display: "inline-block",
                    padding: "6px 14px",
                    background:
                      "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "600",
                    color: "#667eea",
                    border: "1px solid #667eea30"
                  }}
                >
                  {job.postion}
                </span>
              </div>

              <p
                style={{
                  fontSize: "13px",
                  color: "#6c757d",
                  marginBottom: "15px",
                  lineHeight: "1.6"
                }}
              >
                {job.skills}
              </p>

            <div style={{height:"80px",display:"flex"}}>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "15px",
                  width:"100%"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "13px",
                    color: "#495057",
                    background: "#f8f9fa",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    width:"30%"
                  }}
                >
                  <BiRupee size={16} color="#667eea" />
                  <span style={{ fontWeight: "600" }}>{job.salary}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "13px",
                    color: "#495057",
                    background: "#f8f9fa",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    width:"30%"
                  }}
                >
                  <CgWorkAlt size={16} color="#667eea" />
                  <span style={{ fontWeight: "600" }}>
                    {job.experiance} years
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "13px",
                    color: "#495057",
                    background: "#f8f9fa",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    width:"30%"
                  }}
                >
                  <IoLocationOutline size={16} color="#667eea" />
                  <span style={{ fontWeight: "600" }}>{job.location}</span>
                </div>
              </div>
              </div>


<div style={{ marginBottom: "0px" }}>
  <div
    style={{
      borderTop: "1px solid #e9ecef",
      paddingTop: "15px",
      display: "flex",
      /* Allows badge and buttons to stack on tiny screens */
      flexWrap: "wrap", 
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px" 
    }}
  >
    {/* Star Badge Wrapper */}
    <div style={{ flexShrink: 0 }}>
      {renderStarBadge(job.rating)}
    </div>

    {/* Button Group */}
    <div style={{ 
      display: "flex", 
      gap: "8px", 
      alignItems: "center",
      /* Ensures buttons don't stretch vertically on mobile */
      height: "fit-content" 
    }}>
      <button
        onClick={() => navigate(`/jobs/${job._id}`)}
        style={{
          padding: "6px 14px", // Reduced padding for better mobile fit
          fontSize: "12px",    // Slightly smaller text
          height: "36px",      // Fixed height prevents stretching
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(135deg, #0d6efd 0%, #2563eb 100%)",
          color: "white",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(13, 110, 253, 0.2)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap"
        }}
      >
        View
      </button>

      <button
        disabled={job.applied}
        onClick={() => toggleApply(job._id)}
        style={{
          padding: "6px 14px",
          fontSize: "12px",
          height: "36px", // Keep height consistent across all buttons
          borderRadius: "10px",
          border: "none",
          cursor: job.applied ? "not-allowed" : "pointer",
          background: job.applied
            ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          whiteSpace: "nowrap"
        }}
      >
        {job.applied ? "✓ Applied" : "Apply"}
      </button>

      <button
        onClick={() => toggleSave(job._id)}
        style={{
          width: "36px",  // Square button for the bookmark icon
          height: "36px", // Matches height of other buttons
          fontSize: "16px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: job.saved ? "2px solid #ffc107" : "2px solid #e9ecef",
          cursor: "pointer",
          background: job.saved ? "#fff8e1" : "white",
          color: job.saved ? "#ffc107" : "#6c757d",
          transition: "all 0.3s ease",
          padding: "0" // Padding 0 because width/height are set
        }}
      >
        {job.saved ? <BsBookmarkFill /> : <BsBookmark />}
      </button>
    </div>
  </div>
</div>

            </div>
          ))}
        </div>

        {/* Pagination */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "25px"
          }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "12px 20px",
              border: "none",
              background: currentPage === 1 ? "#e9ecef" : "white",
              color: currentPage === 1 ? "#adb5bd" : "#667eea",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              borderRadius: "12px",
              fontWeight: "600",
              boxShadow:
                currentPage === 1
                  ? "none"
                  : "0 4px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            ← Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              style={{
                padding: "12px 16px",
                border: "none",
                background:
                  currentPage === i + 1
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "white",
                color: currentPage === i + 1 ? "white" : "#667eea",
                cursor: "pointer",
                borderRadius: "12px",
                fontWeight: "600",
                minWidth: "48px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => {
                if (currentPage !== i + 1)
                  e.target.style.background = "#f8f9fa";
              }}
              onMouseOut={(e) => {
                if (currentPage !== i + 1)
                  e.target.style.background = "white";
              }}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "12px 20px",
              border: "none",
              background:
                currentPage === totalPages ? "#e9ecef" : "white",
              color:
                currentPage === totalPages ? "#adb5bd" : "#667eea",
              cursor:
                currentPage === totalPages ? "not-allowed" : "pointer",
              borderRadius: "12px",
              fontWeight: "600",
              boxShadow:
                currentPage === totalPages
                  ? "none"
                  : "0 4px 15px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease"
            }}
          >
            Next →
          </button>
        </div>

        <div
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
          }}
        >
          Page {currentPage} of {totalPages} • Showing{" "}
          {cards.length === 0 ? 0 : indexOfFirstCard + 1}-
          {Math.min(indexOfLastCard, cards.length)} of {cards.length} jobs
        </div>
      </div>
    </div>
  );
};

export default Cards;
