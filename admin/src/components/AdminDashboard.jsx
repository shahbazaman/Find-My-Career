import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BsGrid, BsBriefcase, BsPeople, BsGear, BsBoxArrowRight,
  BsEye, BsTrash, BsPencil, BsChevronDown,
  BsSearch,
  BsPersonPlusFill
} from "react-icons/bs";
import { MdAdminPanelSettings, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import "../css/AdminDashboard.css";
import AddJobForm from "./AdminAddJobForm";
import { MdPending, MdVerified } from "react-icons/md";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsPersonCircle, BsClock, BsEnvelope, BsCheckCircleFill } from "react-icons/bs";
import { FaMoon, FaSun, FaUser, FaBell, FaLock, FaGlobe, FaShieldAlt,FaEye } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [isVisible, setIsVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isJobsOpen, setIsJobsOpen] = useState(true);
  const navigate = useNavigate();
  /* ---------------- QUERIES PAGINATION ---------------- */
const QUERIES_PER_PAGE = 5;
const [queryPage, setQueryPage] = useState(1);
/* ---------------- COMMON PAGINATION ---------------- */
const ITEMS_PER_PAGE = 15;

/* JOB LISTING PAGINATION */
const [jobPage, setJobPage] = useState(1);

/* RECRUITERS PAGINATION */
const [recruiterPage, setRecruiterPage] = useState(1);

  /* ---------------- JOB SEEKERS ---------------- */

const [allJobSeekers, setAllJobSeekers] = useState([]);
const [loadingJobSeekers, setLoadingJobSeekers] = useState(false);
const [jobSeekerSearch, setJobSeekerSearch] = useState("");
const JOB_SEEKERS_PER_PAGE = 10;
const [jobSeekerPage, setJobSeekerPage] = useState(1);

  /* ---------------- QUERIES ---------------- */
  const [queries, setQueries] = useState([]); // backend later
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
 const totalQueryPages = Math.ceil(queries.length / QUERIES_PER_PAGE);

const paginatedQueries = queries.slice(
  (queryPage - 1) * QUERIES_PER_PAGE,
  queryPage * QUERIES_PER_PAGE
);

  /* JOBS */
  const [jobsData, setJobsData] = useState([]);

  /* RECRUITERS */
  const [allRecruiters, setAllRecruiters] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loadingRecruiters, setLoadingRecruiters] = useState(false);
  /* ---------------- JOB LIST PAGINATION ---------------- */
const totalJobPages = Math.ceil(jobsData.length / ITEMS_PER_PAGE);
const paginatedJobs = jobsData.slice(
  (jobPage - 1) * ITEMS_PER_PAGE,
  jobPage * ITEMS_PER_PAGE
);

/* ---------------- RECRUITER PAGINATION ---------------- */
const totalRecruiterPages = Math.ceil(recruiters.length / ITEMS_PER_PAGE);
const paginatedRecruiters = recruiters.slice(
  (recruiterPage - 1) * ITEMS_PER_PAGE,
  recruiterPage * ITEMS_PER_PAGE
);
const filteredJobSeekers = allJobSeekers.filter((j) =>
    `${j.firstName} ${j.lastName} ${j.email}`
      .toLowerCase()
      .includes(jobSeekerSearch.toLowerCase())
  );
 const totalJobSeekerPages = Math.ceil(
  filteredJobSeekers.length / JOB_SEEKERS_PER_PAGE
);

const paginatedJobSeekers = filteredJobSeekers.slice(
  (jobSeekerPage - 1) * JOB_SEEKERS_PER_PAGE,
  jobSeekerPage * JOB_SEEKERS_PER_PAGE
);

useEffect(() => {
  setQueryPage(1);
}, [queries.length]);
useEffect(() => setJobPage(1), [jobsData.length]);
useEffect(() => setRecruiterPage(1), [recruiters.length]);
useEffect(() => setJobSeekerPage(1), [filteredJobSeekers.length]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /* ---------------- JOBS ---------------- */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/jobs")
      .then(res => setJobsData(res.data.jobs || []))
      .catch(() => toast.error("Failed to load jobs"));
  }, []);

  /* ---------------- RECRUITERS ---------------- */
  const fetchAllRecruiters = async () => {
    setLoadingRecruiters(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/recruiters/all",
        { headers: { "x-admin-key": import.meta.env.VITE_ADMIN_SECRET } }
      );
      setAllRecruiters(res.data);
    } catch (err) {
      toast.error("Failed to load recruiters");
    } finally {
      setLoadingRecruiters(false);
    }
  };
/* ---------------- JOB SEEKERS ---------------- */
const fetchJobSeekers = async () => {
  setLoadingJobSeekers(true);
  try {
    const res = await axios.get(
      "http://localhost:5000/api/admin/jobseekers", // ← correct endpoint
      { headers: { "x-admin-key": import.meta.env.VITE_ADMIN_SECRET } }
    );
    const raw =
  res.data.jobSeekers ||
  res.data.data ||
  res.data ||
  [];

const list = Array.isArray(raw) ? raw : [];

setAllJobSeekers(list);
  } catch (err) {
    console.error(err);
    toast.error("Failed to load job seekers");
  } finally {
    setLoadingJobSeekers(false);
  }
};
  const fetchRecruiters = async () => {
    setLoadingRecruiters(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/recruiters/pending",
        { headers: { "x-admin-key": import.meta.env.VITE_ADMIN_SECRET } }
      );
      setRecruiters(res.data);
    } catch (err) {
      toast.error("Failed to load recruiters");
    } finally {
      setLoadingRecruiters(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);
  useEffect(() => {
  if (activeMenu !== "dashboard") return;

  axios
    .get("http://localhost:5000/api/queries/admin")
    .then(res => setQueries(res.data || []))
    .catch(err => console.error("Query fetch error:", err));
}, [activeMenu]);

 useEffect(() => {
  if (activeMenu === "recruiters") {
    fetchRecruiters();
    fetchAllRecruiters();
  }
  if (activeMenu === "job-seekers") {
    fetchJobSeekers();
  }
}, [activeMenu]);

  /* ---------------- NOTIFICATION ---------------- */
  const postNotification = async (id, title) => {
    try {
      await axios.post(
        `http://localhost:5000/api/notifications/user/${id}`, // ✅ FIXED
        {
          title,
          label: "Just now",
          type: "system"
        }
      );
    } catch (error) {
      console.error("Notification error:", error.response?.data || error.message);
    }
  };

  /* ---------------- ACTIONS ---------------- */
  const approveRecruiter = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/recruiters/approve/${id}`,
        {},
        { headers: { "x-admin-key": import.meta.env.VITE_ADMIN_SECRET } }
      );
      toast.success("Recruiter approved");
      fetchRecruiters();
      postNotification(id, "Admin approved your login request"); // ✅ FIXED
    } catch {
      toast.error("Approval failed");
    }
  };

  const rejectRecruiter = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/recruiters/reject/${id}`,
        {},
        { headers: { "x-admin-key": import.meta.env.VITE_ADMIN_SECRET } }
      );
      toast.success("Recruiter rejected");
      fetchRecruiters();
      postNotification(id, "Admin rejected your login request"); // ✅ OPTIONAL
    } catch {
      toast.error("Rejection failed");
    }
  };
  /* ---------------- MENU ---------------- */
  const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <BsGrid size={20} /> },
  { id: "recruiters", label: "Recruiters", icon: <BsPeople size={20} /> },
  { id: "job-seekers", label: "Job Seekers", icon: <BsPeople size={20} /> }
];

// ... existing state ...

  // 1. Add Search State for Recruiters
  const [recruiterSearch, setRecruiterSearch] = useState("");

  // 2. Filter Logic for Recruiters
  const filteredRecruiters = allRecruiters.filter((r) =>
    `${r.firstName} ${r.lastName} ${r.email}`
      .toLowerCase()
      .includes(recruiterSearch.toLowerCase())
  );

  // 3. Export Functionality (Generic)
  const handleExportCSV = (data, filename) => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        ["ID", "Name", "Email", "Role"], // Header
        ...data.map((item) => [
          item._id,
          `${item.firstName} ${item.lastName}`,
          item.email,
          item.role || "User",
        ]),
      ]
        .map((e) => e.join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${filename}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4. Common Styles (To keep designs consistent)
  const commonStyles = {
    card: {
      background: "white",
      borderRadius: "16px",
      padding: "24px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      marginBottom: "24px",
    },
    headerRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
      flexWrap: "wrap",
      gap: "15px",
    },
    titleGroup: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    actionGroup: {
      display: "flex",
      gap: "10px",
    },
    searchInput: {
      padding: "10px 16px",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      outline: "none",
      width: "250px",
      fontSize: "14px",
    },
    btnPrimary: {
      background: "#0d6efd",
      color: "white",
      border: "none",
      padding: "10px 20px",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    btnSecondary: {
      background: "white",
      color: "#333",
      border: "1px solid #e0e0e0",
      padding: "10px 20px",
      borderRadius: "8px",
      fontWeight: "600",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    tableHeader: {
      padding: "16px",
      textAlign: "left",
      fontSize: "13px",
      fontWeight: "700",
      color: "#6c757d",
      textTransform: "uppercase",
      borderBottom: "2px solid #f0f0f0",
    },
    tableCell: {
      padding: "16px",
      borderBottom: "1px solid #f5f5f5",
      verticalAlign: "middle",
    },
  };
  
  const exportJobSeekersCSV = () => {
    const headers = ["ID,First Name,Last Name,Email,Joined Date"];
    const rows = paginatedJobSeekers.map((j) => ( 
      `${j._id},${j.firstName},${j.lastName},${j.email},${new Date(j.createdAt).toLocaleDateString()}`
    ));
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "job_seekers_list.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // --- RECRUITER TAB LOGIC ---
const [RecruitersSearch, setRecruitersSearch] = useState("");

// Logic to filter recruiters based on search input
const filteredRecruitersList = allRecruiters ? allRecruiters.filter((r) => {
  const fullName = `${r.firstName} ${r.lastName}`.toLowerCase();
  const email = r.email.toLowerCase();
  const searchTerm = RecruitersSearch.toLowerCase();
  return fullName.includes(searchTerm) || email.includes(searchTerm);
}) : [];
const ACTIVE_RECRUITERS_PER_PAGE = 10;
const [activeRecruiterPage, setActiveRecruiterPage] = useState(1);

const totalActiveRecruiterPages = Math.ceil(
  filteredRecruitersList.length / ACTIVE_RECRUITERS_PER_PAGE
);

const paginatedActiveRecruiters = filteredRecruitersList.slice(
  (activeRecruiterPage - 1) * ACTIVE_RECRUITERS_PER_PAGE,
  activeRecruiterPage * ACTIVE_RECRUITERS_PER_PAGE
);
useEffect(() => {
  setActiveRecruiterPage(1);
}, [filteredRecruitersList.length]);

// Logic to export the filtered list to CSV
const exportRecruitersCSV = () => {
  if (filteredRecruitersList.length === 0) {
    alert("No data to export");
    return;
  }
  const headers = ["ID,First Name,Last Name,Email"];
  const rows = filteredRecruitersList.map(r => 
    `${r._id},${r.firstName},${r.lastName},${r.email}`
  );
  const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "recruiters_list.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
/* ================= USER ACTION HANDLERS ================= */
const handleViewUser = (userId) => {
  navigate(`/admin/user/view/${userId}`);
};
const handleEditUser = (userId) => {
  navigate(`/admin/user/edit/${userId}`);
};
const handleDeleteUser = async (userId, type = "user") => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/admin/users/${userId}`,
      {
        headers: {
          "x-admin-key": import.meta.env.VITE_ADMIN_SECRET
        }
      }
    );

    toast.success("User deleted successfully");

    // Update UI instantly
    if (type === "job-seeker") {
      setJobSeekers(prev => prev.filter(u => u._id !== userId));
      setAllJobSeekers(prev => prev.filter(u => u._id !== userId));
    }

    if (type === "recruiter") {
      setAllRecruiters(prev => prev.filter(u => u._id !== userId));
    }

  } catch (err) {
    toast.error("Delete failed");
  }
};
// console.log("Total queries:", queries.length);

  return (
    <div className={`admin-root ${darkMode ? "dark-mode" : ""}`} style={{marginTop:"80px"}}>
      <div className={`sidebar ${isSidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-box">
            <MdAdminPanelSettings fontSize="50px" />
          </div>
          {isSidebarOpen && (
            <div>
              <h3 className="sidebar-title">Admin Panel</h3>
              <p className="sidebar-subtitle">Manage Everything</p>
            </div>
          )}
        </div>
        <div className="sidebar-menu">
          {menuItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`sidebar-menu-item ${activeMenu === item.id ? "active" : ""}`} >
              {item.icon}
              {isSidebarOpen && <span className="sidebar-menu-label">{item.label}</span>}
            </div>
          ))}
<div className="sidebar-menu-item" onClick={() => setIsJobsOpen(!isJobsOpen)}>
  <BsBriefcase size={20} />
  {isSidebarOpen && (
    <>
      <span className="sidebar-menu-label">Jobs</span>
      <BsChevronDown
        style={{
          marginLeft: "auto",
          transform: isJobsOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "0.3s"
        }}
      />
    </>
  )}
</div>

{/* JOBS CHILDREN — MUST BE IMMEDIATELY AFTER */}
{isJobsOpen && isSidebarOpen && (
  <div style={{ marginLeft: "40px" }}>
    <div
      className={`sidebar-menu-item ${activeMenu === "jobs-list" ? "active" : ""}`}
      onClick={() => setActiveMenu("jobs-list")}
    >
      📄 <span className="sidebar-menu-label">Job Listing</span>
    </div>
    <div
      className={`sidebar-menu-item ${activeMenu === "add-job" ? "active" : ""}`}
      onClick={() => setActiveMenu("add-job")}
    >
      ➕ <span className="sidebar-menu-label">Add Job</span>
    </div>
  </div>
)}

{/* SETTINGS — ALWAYS LAST */}
<div
  onClick={() => setActiveMenu("settings")}
  className={`sidebar-menu-item ${activeMenu === "settings" ? "active" : ""}`}
>
  <BsGear size={20} />
  {isSidebarOpen && <span className="sidebar-menu-label">Settings</span>}
</div>

        </div>

        <div className="sidebar-logout-wrap">
          <div className="sidebar-logout">
            <BsBoxArrowRight size={20} />
            {isSidebarOpen && <span className="sidebar-logout-text">Logout</span>}
          </div>
        </div>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="sidebar-toggle"
        >
          {isSidebarOpen ? "←" : "→"}
        </button>
      </div>

      {/* MAIN */}
      <div className="main" style={{ marginLeft: isSidebarOpen ? "280px" : "80px" }}>
        <div className="page">

          {/* DASHBOARD */}
 {activeMenu === "dashboard" && (
  <>
    <div className={`page-header ${isVisible ? "page-header-visible" : ""}`}>
      <h1>Dashboard</h1>
      <p>Overview of your admin panel</p>
    </div>

    <div className="stat-card stat-card-visible">
      <h2 className="text1 ms-4">User Queries</h2>

      {queries.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No queries received yet.</p>
      ) : (
        <table className="jobs-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedQueries.map(q => (
              <tr
                key={q._id}
                style={{
                  opacity: q.isRead ? 0.5 : 1,
                  filter: q.isRead ? "blur(0.5px)" : "none"
                }}
              >
                <td>{q.name}</td>
                <td>{q.email}</td>
                <td>{q.subject}</td>
                <td>{q.message}</td>
                <td>
                  <button
                    className="btn-primary"
                    onClick={() => setReplyingTo(q)}
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
{/* ================= QUERIES PAGINATION ================= */}
{totalQueryPages > 1 && (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "20px",
      flexWrap: "wrap",
      gap: "12px"
    }}
  >
    <button
      onClick={() => setQueryPage(p => Math.max(p - 1, 1))}
      disabled={queryPage === 1}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        background: queryPage === 1 ? "#f1f3f5" : "white",
        fontWeight: "600",
        cursor: queryPage === 1 ? "not-allowed" : "pointer"
      }}
    >
      ⬅ Previous
    </button>

    <span style={{ fontWeight: "600" }}>
      Page {queryPage} of {totalQueryPages}
    </span>

    <button
      onClick={() =>
        setQueryPage(p => Math.min(p + 1, totalQueryPages))
      }
      disabled={queryPage === totalQueryPages}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        background:
          queryPage === totalQueryPages ? "#f1f3f5" : "white",
        fontWeight: "600",
        cursor:
          queryPage === totalQueryPages ? "not-allowed" : "pointer"
      }}
    >
      Next ➡
    </button>
  </div>
)}

    </div>
  </>
)}

    {/* ================= REPLY SECTION ================= */}
{replyingTo && (
  <div className="stat-card stat-card-visible" style={{ marginTop: "20px" }}>
    <h3>Reply to {replyingTo.name}</h3>

    <textarea
      rows={4}
      style={{ width: "100%", marginBottom: "10px" }}
      value={replyText}
      onChange={(e) => setReplyText(e.target.value)}
    />

    <button
      className="btn-primary"
      onClick={async () => {
        try {
          await axios.post(
            `http://localhost:5000/api/queries/admin/reply/${replyingTo._id}`,
            { reply: replyText }
          );

          setQueries(prev =>
            prev.map(q =>
              q._id === replyingTo._id
                ? { ...q, isRead: true }
                : q
            )
          );

          setReplyingTo(null);
          setReplyText("");
        } catch (err) {
          console.error("Reply error:", err);
        }
      }}
    >
      Send Reply
    </button>
  </div>
)}

          {/* JOB LISTING */}
{activeMenu === "jobs-list" && (
  <div style={{
    animation: "fadeIn 0.8s ease-out"
  }}>
    {/* Page Header */}
    <div style={{
      marginBottom: "40px",
      animation: "slideDown 0.6s ease-out"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "12px"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "16px"
        }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
          }}>
            <BsBriefcase style={{ fontSize: "24px", color: "white" }} />
          </div>
          <div>
            <h1 style={{
              fontSize: "2rem",
              fontWeight: "800",
              color: "#1a1a1a",
              margin: "0",
              letterSpacing: "-0.5px"
            }}>
              Job Listings
            </h1>
            <p style={{
              fontSize: "1rem",
              color: "#6c757d",
              margin: "4px 0 0 0",
              fontWeight: "500"
            }}>
              Manage all job postings and opportunities
            </p>
          </div>
        </div>
        
        {/* Stats Summary */}
        <div style={{
          display: "flex",
          gap: "16px"
        }}>
          <div style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            color: "white",
            padding: "12px 24px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.25)"
          }}>
            <div style={{ fontSize: "24px", fontWeight: "700" }}>{jobsData.length}</div>
            <div style={{ fontSize: "12px", opacity: "0.9", fontWeight: "600" }}>Total Jobs</div>
          </div>
        </div>
      </div>
    </div>

    {/* Jobs Table Card */}
    <div style={{
      background: "white",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
    }}>
      {jobsData.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#6c757d"
        }}>
          <BsBriefcase style={{
            fontSize: "64px",
            color: "#6366f1",
            marginBottom: "16px",
            opacity: "0.3"
          }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", margin: "0 0 8px 0" }}>
            No Jobs Posted Yet
          </h3>
          <p style={{ margin: "0", opacity: "0.7" }}>
            Start by adding your first job posting
          </p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#6c757d",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  Company
                </th>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#6c757d",
                  textTransform: "uppercase"
                }}>
                  Position
                </th>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#6c757d",
                  textTransform: "uppercase"
                }}>
                  Location
                </th>
                <th style={{
                  padding: "16px",
                  textAlign: "left",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#6c757d",
                  textTransform: "uppercase"
                }}>
                  Salary
                </th>
                <th style={{
                  padding: "16px",
                  textAlign: "center",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#6c757d",
                  textTransform: "uppercase"
                }}>
                  Status
                </th>
                <th style={{
                  padding: "16px",
                  textAlign: "center",
                  fontSize: "13px",
                  fontWeight: "700",
                  color: "#6c757d",
                  textTransform: "uppercase"
                }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobs.map((job) => (
                <tr key={job._id} style={{
                  borderBottom: "1px solid #f5f5f5",
                  transition: "all 0.2s ease"
                }}>
                  <td style={{ padding: "20px 16px" }}>
                    <div style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#1a1a1a"
                    }}>
                      {job.companyName}
                    </div>
                  </td>
                  <td style={{ padding: "20px 16px" }}>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#6366f1"
                    }}>
                      {job.jobTitle}
                    </div>
                  </td>
                  <td style={{ padding: "20px 16px" }}>
                    <div style={{
                      fontSize: "14px",
                      color: "#6c757d",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}>
                      📍 {job.location}
                    </div>
                  </td>
                  <td style={{ padding: "20px 16px" }}>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#28a745"
                    }}>
                      ${job.salaryMin?.toLocaleString()}
                    </div>
                  </td>
                  <td style={{ padding: "20px 16px", textAlign: "center" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600",
                      background: job.status === "active" 
                        ? "linear-gradient(135deg, #28a745 0%, #20c997 100%)"
                        : job.status === "closed"
                        ? "linear-gradient(135deg, #dc3545 0%, #c82333 100%)"
                        : "linear-gradient(135deg, #ffc107 0%, #ff9800 100%)",
                      color: "white",
                      boxShadow: job.status === "active"
                        ? "0 2px 8px rgba(40, 167, 69, 0.25)"
                        : job.status === "closed"
                        ? "0 2px 8px rgba(220, 53, 69, 0.25)"
                        : "0 2px 8px rgba(255, 193, 7, 0.25)"
                    }}>
                      {job.status === "active" && "●"}
                      {job.status === "closed" && "●"}
                      {job.status !== "active" && job.status !== "closed" && "●"}
                      {" "}
                      {job.status || "Pending"}
                    </span>
                  </td>
                  <td style={{ padding: "20px 16px" }}>
                    <div style={{
                      display: "flex",
                      gap: "8px",
                      justifyContent: "center"
                    }}>
                      <button
                        style={{
                          background: "white",
                          border: "2px solid #e9ecef",
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#6366f1",
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#6366f1";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = "#6366f1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.color = "#6366f1";
                          e.currentTarget.style.borderColor = "#e9ecef";
                        }}
                        title="View Details"
                      >
                        <BsEye style={{ fontSize: "16px" }} />
                      </button>
                      <button
                        style={{
                          background: "white",
                          border: "2px solid #e9ecef",
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#28a745",
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#28a745";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = "#28a745";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.color = "#28a745";
                          e.currentTarget.style.borderColor = "#e9ecef";
                        }}
                        title="Edit Job"
                      >
                        <BsPencil style={{ fontSize: "16px" }} />
                      </button>
                      <button
                        style={{
                          background: "white",
                          border: "2px solid #e9ecef",
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#dc3545",
                          transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#dc3545";
                          e.currentTarget.style.color = "white";
                          e.currentTarget.style.borderColor = "#dc3545";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "white";
                          e.currentTarget.style.color = "#dc3545";
                          e.currentTarget.style.borderColor = "#e9ecef";
                        }}
                        title="Delete Job"
                      >
                        <BsTrash style={{ fontSize: "16px" }} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
{/* ================= JOBS PAGINATION ================= */}
{totalJobPages > 1 && (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "24px",
      flexWrap: "wrap",
      gap: "12px"
    }}
  >
    <button
      onClick={() => setJobPage(p => Math.max(p - 1, 1))}
      disabled={jobPage === 1}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        background: jobPage === 1 ? "#f1f3f5" : "white",
        fontWeight: "600"
      }}
    >
      ⬅ Previous
    </button>

    <span style={{ fontWeight: "600" }}>
      Page {jobPage} of {totalJobPages}
    </span>

    <button
      onClick={() => setJobPage(p => Math.min(p + 1, totalJobPages))}
      disabled={jobPage === totalJobPages}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        background:
          jobPage === totalJobPages ? "#f1f3f5" : "white",
        fontWeight: "600"
      }}
    >
      Next ➡
    </button>
  </div>
)}
        </div>
      )}
    </div>
  </div>
)}

          {/* ADD JOB */}
          {activeMenu === "add-job" && (
            <>
              <div className="page-header page-header-visible">
                <h1>Add Job</h1>
              </div>
              <div className="stat-card stat-card-visible">
                <AddJobForm />
              </div>
            </>
          )}

{activeMenu === "recruiters" && (
  <div style={{
    animation: "fadeIn 0.8s ease-out"
  }}>
    <div style={{
      marginBottom: "40px",
      animation: "slideDown 0.6s ease-out"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        marginBottom: "12px"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #0d6efd 0%, #2563eb 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(13, 110, 253, 0.3)"
        }}>
          <MdPending style={{ fontSize: "24px", color: "white" }} />
        </div>
        <div>
          <h1 style={{
            fontSize: "2rem",
            fontWeight: "800",
            color: "#1a1a1a",
            margin: "0",
            letterSpacing: "-0.5px"
          }}>
            Pending Recruiters
          </h1>
          <p style={{
            fontSize: "1rem",
            color: "#6c757d",
            margin: "4px 0 0 0",
            fontWeight: "500"
          }}>
            Review and manage recruiter account requests
          </p>
        </div>
      </div>
    </div>
    <div style={{
      background: "white",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      marginBottom: "40px"
    }}>
      {loadingRecruiters ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#6c757d" }}>
          <div style={{
            width: "48px",
            height: "48px",
            border: "4px solid #f3f3f3",
            borderTop: "4px solid #0d6efd",
            borderRadius: "50%",
            margin: "0 auto 16px",
            animation: "spin 1s linear infinite"
          }} />
          Loading recruiters...
        </div>
      ) : recruiters.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "#6c757d"
        }}>
          <BsCheckCircleFill style={{
            fontSize: "64px",
            color: "#28a745",
            marginBottom: "16px",
            opacity: "0.5"
          }} />
          <h3 style={{ fontSize: "1.2rem", fontWeight: "600", margin: "0 0 8px 0" }}>
            All Caught Up!
          </h3>
          <p style={{ margin: "0", opacity: "0.7" }}>
            No pending recruiter requests at the moment
          </p>
        </div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
              <th style={{
                padding: "16px",
                textAlign: "left",
                fontSize: "13px",
                fontWeight: "700",
                color: "#6c757d",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                <BsPersonCircle style={{ marginRight: "8px", verticalAlign: "middle" }} />
                Recruiter
              </th>
              <th style={{
                padding: "16px",
                textAlign: "left",
                fontSize: "13px",
                fontWeight: "700",
                color: "#6c757d",
                textTransform: "uppercase"
              }}>
                <BsEnvelope style={{ marginRight: "8px", verticalAlign: "middle" }} />
                Email
              </th>
              <th style={{
                padding: "16px",
                textAlign: "left",
                fontSize: "13px",
                fontWeight: "700",
                color: "#6c757d",
                textTransform: "uppercase"
              }}>
                <BsClock style={{ marginRight: "8px", verticalAlign: "middle" }} />
                Requested
              </th>
              <th style={{
                padding: "16px",
                textAlign: "right",
                fontSize: "13px",
                fontWeight: "700",
                color: "#6c757d",
                textTransform: "uppercase"
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedRecruiters.map((r) => (
              <tr key={r._id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                <td style={{ padding: "20px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #0d6efd 0%, #2563eb 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "16px",
                      fontWeight: "700"
                    }}>
                      {r.firstName[0]}{r.lastName[0]}
                    </div>
                    <span style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a1a" }}>
                      {r.firstName} {r.lastName}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "20px 16px", fontSize: "14px", color: "#6c757d" }}>
                  {r.email}
                </td>
                <td style={{ padding: "20px 16px", fontSize: "14px", color: "#6c757d" }}>
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "20px 16px", textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => approveRecruiter(r._id)}
                      style={{
                        background: "linear-gradient(135deg, #28a745 0%, #20c997 100%)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 8px rgba(40, 167, 69, 0.25)"
                      }}
                    >
                      <FaCheckCircle style={{ fontSize: "14px" }} />
                      Approve
                    </button>
                    <button
                      onClick={() => rejectRecruiter(r._id)}
                      style={{
                        background: "linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 8px rgba(220, 53, 69, 0.25)"
                      }}
                    >
                      <FaTimesCircle style={{ fontSize: "14px" }} />
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
{/* ================= RECRUITERS PAGINATION ================= */}
{totalRecruiterPages > 1 && (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "24px",
      flexWrap: "wrap",
      gap: "12px"
    }}
  >
    <button
      onClick={() =>
        setRecruiterPage(p => Math.max(p - 1, 1))
      }
      disabled={recruiterPage === 1}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        background:
          recruiterPage === 1 ? "#f1f3f5" : "white",
        fontWeight: "600"
      }}
    >
      ⬅ Previous
    </button>

    <span style={{ fontWeight: "600" }}>
      Page {recruiterPage} of {totalRecruiterPages}
    </span>

    <button
      onClick={() =>
        setRecruiterPage(p =>
          Math.min(p + 1, totalRecruiterPages)
        )
      }
      disabled={recruiterPage === totalRecruiterPages}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        background:
          recruiterPage === totalRecruiterPages
            ? "#f1f3f5"
            : "white",
        fontWeight: "600"
      }}
    >
      Next ➡
    </button>
  </div>
)}


    </div>
    <div style={{
      background: "white",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "24px"
      }}>
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "10px",
          background: "linear-gradient(135deg, #0d6efd 0%, #2563eb 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(13, 110, 253, 0.25)"
        }}>
          <MdVerified style={{ fontSize: "20px", color: "white" }} />
        </div>
        <h2 style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#1a1a1a",
          margin: "0"
        }}>
          Active Recruiters
        </h2>
        <span style={{
          background: "linear-gradient(135deg, #0d6efd 0%, #2563eb 100%)",
          color: "white",
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: "600"
        }}>
          {allRecruiters.length}
        </span>
      </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>{/* Search Input */}
          <div style={{ position: "relative" }}>
            <BsSearch style={{ 
              position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#adb5bd" 
            }} />
            <input 
              type="text" 
              placeholder="Search candidates..." 
              value={RecruitersSearch}
              onChange={(e) => setRecruitersSearch(e.target.value)}
              style={{
                padding: "10px 16px 10px 38px",
                borderRadius: "8px",
                border: "1px solid #dee2e6",
                fontSize: "14px",
                width: "240px",
                outline: "none"
              }}
            />
          </div>
          <button 
            onClick={exportRecruitersCSV}
            style={{
              background: "white",
              border: "1px solid #dee2e6",
              color: "#495057",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: "8px",
              transition: "all 0.2s"
            }}
          >
            <BsBoxArrowRight /> Export CSV
          </button>
          <button style={{
            background: "#6f42c1",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: "8px",
            boxShadow: "0 2px 6px rgba(111, 66, 193, 0.3)"
          }} onClick={()=> navigate('/addUserForm')} >
            <BsPersonPlusFill /> Add Recruiters
          </button>
        </div>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #f0f0f0" }}>
            <th style={{
              padding: "16px",
              textAlign: "left",
              fontSize: "13px",
              fontWeight: "700",
              color: "#6c757d",
              textTransform: "uppercase"
            }}>ID</th>
            <th style={{
              padding: "16px",
              textAlign: "left",
              fontSize: "13px",
              fontWeight: "700",
              color: "#6c757d",
              textTransform: "uppercase"
            }}>Name</th>
            <th style={{
              padding: "16px",
              textAlign: "left",
              fontSize: "13px",
              fontWeight: "700",
              color: "#6c757d",
              textTransform: "uppercase"
            }}>Email</th>
            <th style={{
              padding: "16px",
              textAlign: "center",
              fontSize: "13px",
              fontWeight: "700",
              color: "#6c757d",
              textTransform: "uppercase"
            }}>Actions</th>
          </tr>
        </thead>
        <tbody>{filteredRecruitersList.length > 0 ? (
       paginatedActiveRecruiters.map((i) => (
       <tr key={i._id} style={{ borderBottom: "1px solid #f5f5f5" }}>
        <td style={{ padding: "20px 16px" }}>
          <span style={{
            fontSize: "13px",
            fontFamily: "monospace",
            color: "#6c757d",
            background: "#f8f9fa",
            padding: "4px 8px",
            borderRadius: "6px"
          }}>
            {i._id}
          </span>
        </td>
        <td style={{ padding: "20px 16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #0d6efd 0%, #2563eb 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "14px",
              fontWeight: "600"
            }}>
              {i.firstName?.[0]}{i.lastName?.[0]}
            </div>
            <span style={{ fontSize: "15px", fontWeight: "600", color: "#1a1a1a" }}>
              {i.firstName} {i.lastName}
            </span>
          </div>
        </td>
        <td style={{ padding: "20px 16px", fontSize: "14px", color: "#6c757d" }}>
          {i.email}
        </td>
        <td style={{ padding: "20px 16px" }}>
          <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
           {/* <button title="View Detail" style={{borderRadius: "30%",border:"none",padding:"8%"}}> */}
             
            <button
          title="View Detail"
          onClick={() => handleViewUser(i._id)} style={{borderRadius: "30%",border:"none",padding:"8%"}}
        >
          <FaEye style={{
                        fontSize:"16px", borderRadius: "50%", border: "none",
                        background: "#e7f1ff", color: "#0d6efd", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                      }} />
            </button>

<button
  title="Edit"
  onClick={() => handleEditUser(i._id)} style={{borderRadius: "30%",border:"none",padding:"8%"}}
>
  <MdEdit style={{
                        fontSize:"16px", borderRadius: "40%", border: "none",
                        background: "#e6fffa", color: "#2dce89", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                      }} />
</button>

<button
  title="Delete"
  onClick={() => handleDeleteUser(i._id, "recruiter")} style={{borderRadius: "30%",border:"none",padding:"8%"}}
>
  <BsTrash style={{
                        fontSize:"16px", borderRadius: "40%", border: "none",
                        background: "#fff5f5", color: "#f5365c", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                      }} />
</button>

          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="4" style={{ padding: "40px", textAlign: "center" }}>
        <div style={{ color: "#adb5bd", fontSize: "16px" }}>
          <p>No recruiters found matching "<strong>{RecruitersSearch}</strong>"</p>
          <button 
            onClick={() => setRecruitersSearch("")}
            style={{ background: "none", border: "none", color: "#0d6efd", cursor: "pointer", textDecoration: "underline", fontSize: "14px" }}
          >
            Clear search
          </button>
        </div>
      </td>
    </tr>
  )}</tbody>    
  </table>
  {totalActiveRecruiterPages > 1 && (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "24px",
    gap: "12px"
  }}>
    <button
      onClick={() => setActiveRecruiterPage(p => Math.max(p - 1, 1))}
      disabled={activeRecruiterPage === 1}
    >
      ⬅ Previous
    </button>

    <span>
      Page {activeRecruiterPage} of {totalActiveRecruiterPages}
    </span>

    <button
      onClick={() =>
        setActiveRecruiterPage(p =>
          Math.min(p + 1, totalActiveRecruiterPages)
        )
      }
      disabled={activeRecruiterPage === totalActiveRecruiterPages}
    >
      Next ➡
    </button>
  </div>
)}

    </div>
  </div>
)}

{activeMenu === "job-seekers" && (
  <div className="animate-fade-in">
    <div style={{
      background: "white",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "32px",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "48px", height: "48px", borderRadius: "12px",
            background: "linear-gradient(135deg, #6f42c1 0%, #a885d8 100%)", // Purple Theme
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(111, 66, 193, 0.25)"
          }}>
            <BsPeople style={{ fontSize: "24px", color: "white" }} />
          </div>
          <div>
            <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1a1a1a", margin: "0" }}>
              Job Seekers
            </h2>
            <p style={{ margin: "4px 0 0", color: "#6c757d", fontSize: "14px" }}>
              Manage candidate profiles and directory
            </p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
          <div style={{ position: "relative" }}>
            <BsSearch style={{ 
              position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#adb5bd" 
            }} />
            <input 
              type="text" 
              placeholder="Search candidates..." 
              value={jobSeekerSearch}
              onChange={(e) => setJobSeekerSearch(e.target.value)}
              style={{
                padding: "10px 16px 10px 38px",
                borderRadius: "8px",
                border: "1px solid #dee2e6",
                fontSize: "14px",
                width: "240px",
                outline: "none"
              }}
            />
          </div>
          <button 
            onClick={exportJobSeekersCSV}
            style={{
              background: "white",
              border: "1px solid #dee2e6",
              color: "#495057",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: "8px",
              transition: "all 0.2s"
            }}
          >
            <BsBoxArrowRight /> Export CSV
          </button>
          <button style={{
            background: "#6f42c1",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex", alignItems: "center", gap: "8px",
            boxShadow: "0 2px 6px rgba(111, 66, 193, 0.3)"
          }} onClick={()=> navigate('/addUserForm')}>
            <BsPersonPlusFill /> Add Job Seeker
          </button>
        </div>
      </div>
      {loadingJobSeekers ? (
        <div style={{ padding: "40px", textAlign: "center", color: "#6c757d" }}>
          <div className="spinner-border" role="status" style={{ color: "#6f42c1" }}></div>
          <p className="mt-2">Loading data...</p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
            <thead>
              <tr>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#8898aa", textTransform: "uppercase", borderBottom: "1px solid #e9ecef" }}>
                  Candidate Name
                </th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#8898aa", textTransform: "uppercase", borderBottom: "1px solid #e9ecef" }}>
                  Contact
                </th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#8898aa", textTransform: "uppercase", borderBottom: "1px solid #e9ecef" }}>
                  Joined Date
                </th>
                <th style={{ padding: "16px", textAlign: "center", fontSize: "12px", fontWeight: "700", color: "#8898aa", textTransform: "uppercase", borderBottom: "1px solid #e9ecef" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedJobSeekers.map((j) => ( 
                <tr key={j._id} style={{ transition: "background 0.2s" }}>
                  <td style={{ padding: "20px 16px", borderBottom: "1px solid #f5f5f5", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                      <div style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "#f3f0ff", color: "#6f42c1",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontWeight: "700", fontSize: "14px"
                      }}>
                        {j.firstName[0]}{j.lastName[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: "600", color: "#32325d", fontSize: "14px" }}>
                          {j.firstName} {j.lastName}
                        </div>
                        <div style={{ fontSize: "12px", color: "#adb5bd" }}>
                          ID: {j._id.substring(0, 6)}...
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "20px 16px", borderBottom: "1px solid #f5f5f5", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#525f7f", fontSize: "14px" }}>
                      <BsEnvelope style={{ color: "#adb5bd" }} /> {j.email}
                    </div>
                  </td>
                  <td style={{ padding: "20px 16px", borderBottom: "1px solid #f5f5f5", verticalAlign: "middle" }}>
                    <span style={{ 
                      background: "#f8f9fa", padding: "6px 12px", borderRadius: "6px", 
                      color: "#525f7f", fontSize: "13px", fontWeight: "500", border: "1px solid #e9ecef"
                    }}>
                      {new Date(j.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td style={{ padding: "20px 16px", borderBottom: "1px solid #f5f5f5", verticalAlign: "middle" }}>
                    <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                      <button
  title="View Profile"
  onClick={() => handleViewUser(j._id)} style={{
                        width: "32px", height: "32px", borderRadius: "8px", border: "none",
                        background: "#e7f1ff", color: "#0d6efd", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                      }}
>
  <FaEye size={14} />
</button>
<button
  title="Edit User"
  onClick={() => handleEditUser(j._id)} style={{
                        width: "32px", height: "32px", borderRadius: "8px", border: "none",
                        background: "#e6fffa", color: "#2dce89", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                      }}
>
  <MdEdit size={14} />
</button>

<button
  title="Delete User"
  onClick={() => handleDeleteUser(j._id, "job-seeker")} style={{
                        width: "32px", height: "32px", borderRadius: "8px", border: "none",
                        background: "#fff5f5", color: "#f5365c", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
                      }}
>
  <BsTrash size={14} />
</button>

                    </div>
                  </td>
                </tr>
              ))}

              {filteredJobSeekers.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ padding: "40px", textAlign: "center", color: "#8898aa" }}>
                    No job seekers found matching "{jobSeekerSearch}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
{/* ================= JOB SEEKERS PAGINATION ================= */}
{totalJobSeekerPages > 1 && (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "24px",
      flexWrap: "wrap",
      gap: "12px"
    }}
  >
    <button
      onClick={() =>
        setJobSeekerPage(p => Math.max(p - 1, 1))
      }
      disabled={jobSeekerPage === 1}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        background:
          jobSeekerPage === 1 ? "#f1f3f5" : "white",
        fontWeight: "600"
      }}
    >
      ⬅ Previous
    </button>

    <span style={{ fontWeight: "600" }}>
      Page {jobSeekerPage} of {totalJobSeekerPages}
    </span>

    <button
      onClick={() =>
        setJobSeekerPage(p =>
          Math.min(p + 1, totalJobSeekerPages)
        )
      }
      disabled={jobSeekerPage === totalJobSeekerPages}
      style={{
        padding: "8px 16px",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        background:
          jobSeekerPage === totalJobSeekerPages
            ? "#f1f3f5"
            : "white",
        fontWeight: "600"
      }}
    >
      Next ➡
    </button>
  </div>
)}

        </div>
      )}
    </div>
  </div>
)}
          {/* SETTINGS */}
{activeMenu === "settings" && (
  <div>
    <div className="page-header page-header-visible">
      <h1>Settings</h1>
      <p>Manage your account preferences and application configuration</p>
    </div>

    {/* Responsive Grid Container */}
    <div className="settings-grid">
      
      {/* Theme Toggle Card */}
      <div className="stat-card stat-card-visible">
        <div className="settings-item">
          <div className="settings-info">
            <div className="icon-wrapper">
              {darkMode ? <FaSun /> : <FaMoon />}
            </div>
            <div>
              <h3>Appearance</h3>
              <p>Switch between light and dark themes</p>
            </div>
          </div>
          <button className="btn-primary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>

      {/* Account Profile Section */}
      <div className="stat-card stat-card-visible">
        <div className="settings-item">
          <div className="settings-info">
            <div className="icon-wrapper"><FaUser /></div>
            <div>
              <h3>Profile Info</h3>
              <p>Update your personal details</p>
            </div>
          </div>
          <button className="btn-outline">Edit</button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="stat-card stat-card-visible">
        <div className="settings-item">
          <div className="settings-info">
            <div className="icon-wrapper"><FaBell /></div>
            <div>
              <h3>Notifications</h3>
              <p>Configure alert preferences</p>
            </div>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider round"></span>
          </label>
        </div>
      </div>

      {/* Security Section */}
      <div className="stat-card stat-card-visible">
        <div className="settings-item">
          <div className="settings-info">
            <div className="icon-wrapper"><FaShieldAlt /></div>
            <div>
              <h3>Security</h3>
              <p>Two-factor authentication and logs</p>
            </div>
          </div>
          <button className="btn-outline">Manage</button>
        </div>
      </div>

    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
