import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { 
  FiSearch, 
  FiCheckSquare, 
  FiCalendar, 
  FiDownload,
  FiFilter,
  FiUser,
  FiBriefcase,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiFileText,FiExternalLink
} from "react-icons/fi";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const STATUS_OPTIONS = [
  "Applied",
  "Shortlisted",
  "Interview Scheduled",
  "Rejected",
  "Hired"
];

const Applicants = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [viewingApplicant, setViewingApplicant] = useState(null);
  const [profileData, setProfileData] = useState(null);
const [profileLoading, setProfileLoading] = useState(false);
const ROWS_PER_PAGE = 15;
const [currentPage, setCurrentPage] = useState(1);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchApplicants = async () => {
      if (!token) {
        setError("Authentication required");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(
  `${import.meta.env.VITE_API_BASE_URL}/applications/recruiter/applicants`,
  { headers: { Authorization: `Bearer ${token}` } }
);
        const mapped = Array.isArray(res.data)
          ? res.data.map((a) => ({
              _id: a._id,
              userId: a.user?._id,
              email: a.user?.email,
              name: `${a.user?.firstName || ""} ${a.user?.lastName || ""}`,
              jobTitle: a.job?.jobTitle || "—",
              jobId: a.job?._id,
              status: a.status || "Applied",
              resumeUrl:
                typeof a.profile?.resumeUrl === "string" &&
                a.profile.resumeUrl.startsWith("http")
                  ? a.profile.resumeUrl
                  : null,
              experience: a.profile?.experience || []
            }))
          : [];

        setApplicants(mapped);
      } catch (err) {
  console.error("Applicants fetch error:", err.response || err);

  if (err?.response?.status === 401) {
    localStorage.removeItem("token");
    navigate("/login");
    return;
  }

  const message =
    err?.response?.data?.message ||
    "Failed to load applicants";

  setError(message);
  toast.error(message);
}

 finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [token]);

  useEffect(() => {
  setCurrentPage(1);
}, [searchTerm, statusFilter]);

  /* ================= FILTER ================= */
  const filteredApplicants = useMemo(() => {
    return applicants.filter((a) => {
      const statusOk = statusFilter ? a.status === statusFilter : true;
      const search = searchTerm.toLowerCase();
      const searchOk =
        a.name.toLowerCase().includes(search) ||
        a.jobTitle.toLowerCase().includes(search);
      return statusOk && searchOk;
    });
  }, [applicants, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredApplicants.length / ROWS_PER_PAGE);

const paginatedApplicants = useMemo(() => {
  const start = (currentPage - 1) * ROWS_PER_PAGE;
  const end = start + ROWS_PER_PAGE;
  return filteredApplicants.slice(start, end);
}, [filteredApplicants, currentPage]);

  /* ================= EXPERIENCE ================= */
  const calculateExperience = (exp = []) => {
    if (!Array.isArray(exp)) return "—";
    let totalMonths = 0;

    exp.forEach((e) => {
      if (!e.startDate) return;
      const start = new Date(e.startDate);
      const end = e.endDate ? new Date(e.endDate) : new Date();
      totalMonths +=
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
    });

    const years = Math.floor(totalMonths / 12);
    return years > 0 ? `${years} yrs` : "< 1 yr";
  };

  /* ================= STATUS CHANGE ================= */
  const handleStatusChange = async (applicant, newStatus) => {
    if (applicant.status === newStatus) return;

    setApplicants((prev) =>
      prev.map((a) =>
        a._id === applicant._id ? { ...a, status: newStatus } : a
      )
    );

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/applications/${applicant._id}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const companyName = `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim();

      const notificationMessage =
        newStatus === "Rejected"
          ? `Your application for ${applicant.jobTitle} at ${companyName} was ${newStatus}`
          : `Your application for ${applicant.jobTitle} at ${companyName} was ${newStatus}. Please wait for HR contact.`;

      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/notifications/user/${applicant.userId}`,
        {
          title: "Application Status Updated",
          label: notificationMessage,
          type: "job"
        }
      );

      toast.success(`Status updated to ${newStatus}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch {
      toast.error("Status update failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  /* ================= SELECTION ================= */
  const toggleRow = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const visibleIds =
      searchTerm || statusFilter
        ? filteredApplicants.map((a) => a._id)
        : applicants.map((a) => a._id);

    const allSelected = visibleIds.every((id) =>
      selectedIds.includes(id)
    );

    setSelectedIds(allSelected ? [] : visibleIds);
  };

  /* ================= EXPORT ================= */
  const exportApplicantsToCSV = () => {
    if (!applicants.length) return toast.error("No applicants to export");

    const headers = ["Name", "Job", "Experience", "Status", "Resume"];
    const rows = applicants.map((a) => [
      a.name,
      a.jobTitle,
      calculateExperience(a.experience),
      a.status,
      a.resumeUrl || ""
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) =>
        r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "applicants.csv";
    link.click();
    
    toast.success("Applicants exported successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  /* ================= STATUS BADGE HELPER ================= */
  const getStatusIcon = (status) => {
    switch(status) {
      case "Applied": return <FiFileText />;
      case "Shortlisted": return <FiCheckCircle />;
      case "Interview Scheduled": return <FiCalendar />;
      case "Rejected": return <FiXCircle />;
      case "Hired": return <FiCheckCircle />;
      default: return <FiAlertCircle />;
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case "Applied": return "status-applied";
      case "Shortlisted": return "status-shortlisted";
      case "Interview Scheduled": return "status-interview";
      case "Rejected": return "status-rejected";
      case "Hired": return "status-hired";
      default: return "status-default";
    }
  };

  return (
    <>
      {/* ===== ENHANCED STYLES ===== */}
      <style>{`
  /* Container Styles */
  .applicants-container {
    padding: 1.5rem;
    max-width: 1400px;
    margin: 0 auto;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8ecf1 100%);
    min-height: 100vh;
    border-radius: 20px;
  }

  /* Header */
  .applicants-header {
    margin-bottom: 2rem;
  }

  .applicants-header h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .applicants-header p {
    color: #718096;
    font-size: 0.95rem;
    margin: 0;
  }

  /* Stats Bar */
  .stats-bar {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .stat-card {
    background: white;
    padding: 1.25rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  }

  .stat-icon {
    width: 48px;
    height: 48px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .stat-icon.total {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .stat-icon.selected {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    color: white;
  }

  .stat-info h3 {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 700;
    color: #2d3748;
  }

  .stat-info p {
    margin: 0;
    font-size: 0.85rem;
    color: #718096;
  }

  /* Controls Panel */
  .controls-panel {
    background: white;
    padding: 1.2rem;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.07);
    margin-bottom: 1rem;
    border: 1px solid #e8edf2;
  }

  .controls-row {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  // .search-box {
  //   width: 102%;
  //   position: relative;
  //   margin: 0 15px;
  //   padding-left: -80px;
  //   margin-left: -10px;
  // }
  .search-box {
  width: 100%;
  position: relative;
}


  .search-box input {
    width: 100%;
    height: 52px;
    padding: 0 1rem 0 3rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.92rem;
    transition: all 0.2s;
    background: #f8fafc;
    box-sizing: border-box;
    color: #2d3748;
  }

  .search-box input::placeholder {
    color: #a0aec0;
    font-size: 0.9rem;
  }

  .search-box input:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .search-icon {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
    font-size: 1rem;
    pointer-events: none;
    margin: 0 5px;
  }

  .filter-box {
    width: 100%;
    position: relative;
  }

  .filter-box select {
    width: 100%;
    height: 52px;
    padding: 0 1rem 0 3rem;
    border: 1.5px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.92rem;
    background: #f8fafc;
    cursor: pointer;
    transition: all 0.2s;
    box-sizing: border-box;
    color: #2d3748;
    appearance: auto;
  }

  .filter-box select:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  .filter-icon {
    position: absolute;
    left: 1.1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #a0aec0;
    font-size: 1rem;
    pointer-events: none;
    z-index: 1;
  }

  /* Table Container */
  .table-container {
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    overflow: hidden;
    margin-bottom: 1.5rem;
  }

  .table-wrapper {
    max-height: 600px;
    overflow-y: auto;
    overflow-x: auto;
  }

  .table-wrapper thead th {
    position: sticky;
    top: 0;
    z-index: 2;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  thead {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  thead th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: white;
  }

  tbody tr {
    border-bottom: 1px solid #e2e8f0;
    transition: background-color 0.2s;
  }

  tbody tr:hover {
    background-color: #f7fafc;
  }

  tbody td {
    padding: 1rem;
    font-size: 0.95rem;
    color: #2d3748;
    vertical-align: middle;
  }

  /* Checkbox Styles */
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    accent-color: #667eea;
  }

  /* Status Badge */
  .status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
}

  .status-applied   { background: #ebf8ff; color: #2c5282; }
  .status-shortlisted { background: #fef5e7; color: #d97706; }
  .status-interview { background: #f0e7fe; color: #6b21a8; }
  .status-rejected  { background: #fee;    color: #c53030; }
  .status-hired     { background: #d4edda; color: #155724; }
  .status-default   { background: #e2e8f0; color: #4a5568; }

  /* Status Dropdown */
  .status-select {
    padding: 0.5rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    background: white;
  }

  .status-select:hover { border-color: #cbd5e0; }

  .status-select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  /* Action Buttons */
  .action-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 10px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }

  .btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }

  .btn-secondary {
    background: white;
    color: #667eea;
    border: 2px solid #667eea;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #667eea;
    color: white;
  }

  .btn-success {
    background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
    color: white;
    box-shadow: 0 4px 12px rgba(72, 187, 120, 0.3);
  }

  .btn-success:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(72, 187, 120, 0.4);
  }

  /* Loading State */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #e2e8f0;
    border-top-color: #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading-text {
    margin-top: 1rem;
    color: #718096;
    font-size: 1rem;
  }

  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  }

  .empty-icon {
    font-size: 4rem;
    color: #cbd5e0;
    margin-bottom: 1rem;
  }

  .empty-state h3 { color: #2d3748; margin: 0 0 0.5rem 0; }
  .empty-state p  { color: #718096; margin: 0; }

  /* Mobile Cards (hidden on desktop) */
  .mobile-cards { display: none; }

  .applicant-card {
    background: white;
    border-radius: 14px;
    padding: 1rem;
    margin-bottom: 0.85rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    border: 2px solid transparent;
    transition: all 0.2s;
  }

  .applicant-card.selected {
    border-color: #667eea;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .card-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .card-name {
    font-size: 0.95rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card-row {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #4a5568;
    font-size: 0.88rem;
    font-weight: 500;
  }

  .card-row svg { color: #718096; }

  .card-footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  /* Interview Modal */
  .interview-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .interview-modal {
    background: #ffffff;
    width: 100%;
    max-width: 520px;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 20px 50px rgba(0,0,0,0.25);
    position: relative;
    animation: modalFadeIn 0.25s ease-out;
  }

  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }

  .interview-modal-close {
    position: absolute;
    top: 12px;
    right: 12px;
    background: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
  }

  /* ===== RESPONSIVE ===== */
  @media (max-width: 1024px) {
    .applicants-header h1 {
      font-size: 1.75rem;
    }
    .stats-bar {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    }
  }

  @media (min-width: 769px) {
    .mobile-cards {
      display: none !important;
    }
    .table-wrapper {
      display: block !important;
    }
  }

  @media (max-width: 768px) {
    .applicants-container { padding: 0.85rem; }

    .applicants-header h1 {
      font-size: 1.25rem;
      font-weight: 700;
    }

    .controls-panel {
      padding: 0.9rem;
      border-radius: 14px;
    }

    .controls-row {
      flex-direction: column;
      gap: 0.6rem;
    }

    .search-box,
.filter-box {
  width: 100%;
  min-width: unset;
  margin: 0;
  padding: 0;
}

.search-box input,
.filter-box select {
  width: 100%;
  height: 48px;
  font-size: 0.88rem;
  box-sizing: border-box;
  padding: 0 1rem 0 2.8rem;
}

    .action-buttons {
      flex-direction: column;
      gap: 0.5rem;
    }

    .btn {
      width: 100%;
      justify-content: center;
      font-size: 0.9rem;
      padding: 0.7rem 1rem;
    }

    .table-wrapper { display: none; }
    .mobile-cards  { display: block; }

    .status-badge {
      font-size: 0.8rem;
      padding: 0.4rem 0.85rem;
    }

    .stat-card  { padding: 0.85rem; }
    .stat-info h3 { font-size: 1.4rem; }
    .stat-info p  { font-size: 0.8rem; }
  }

  @media (max-width: 480px) {
    .stats-bar {
      grid-template-columns: 1fr;
    }
    .applicants-header h1 { font-size: 1.1rem; }
    .stat-card { padding: 1rem; }
    .interview-modal {
      max-width: 92%;
      padding: 1rem;
    }
  }
`}</style>

      <div className="applicants-container">
        {/* Header */}
        <div className="applicants-header">
          <h1>
            <FiUser />
            Applicants Management
          </h1>
        </div>
        {/* Controls Panel */}
        <div className="controls-panel">
          <div className="controls-row">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name or job title ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-box">
              <FiFilter className="filter-icon " />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading applicants...</p>
          </div>
        )}

        {/* Table View (Desktop/Tablet) */}
        {!loading && filteredApplicants.length > 0 && (
          <div className="table-container">
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '50px' }}>
                      {/* <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          filteredApplicants.length > 0 &&
                          filteredApplicants.every(a => selectedIds.includes(a._id))
                        }
                      /> */}
                      <BiSolidSelectMultiple onClick={handleSelectAll} style={{fontSize:"18px"}}/>
                    </th>
                    <th>Name</th>
                    <th>Job Title</th>
                    <th>Experience</th>
                    <th>Resume</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedApplicants.map((a) => (
                    <tr key={a._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(a._id)}
                          onChange={() => toggleRow(a._id)}
                        />
                      </td>
                      <td>
                        <strong>{a.name}</strong>
                        <br />
                        <small style={{ color: '#718096' }}>{a.email}</small>
                      </td>
                      <td>{a.jobTitle}</td>
                      <td>{calculateExperience(a.experience)}</td>
                      <td>
                        {a.resumeUrl ? (
                          <a href={a.resumeUrl} target="_blank" rel="noopener noreferrer">
                            <button
                              className="btn btn-secondary"
                              style={{ padding: "0.4rem 0.9rem", fontSize: "0.82rem" }}
                            >
                              <FiExternalLink /> View
                            </button>
                          </a>
                        ) : (
                          <button
                            className="btn"
                            style={{
                              padding: "0.4rem 0.9rem",
                              fontSize: "0.82rem",
                              background: "#f7fafc",
                              color: "#a0aec0",
                              border: "2px solid #e2e8f0",
                              cursor: "pointer"
                            }}
                            onClick={() => toast.info("Resume not uploaded by applicant", {
                              position: "top-right",
                              autoClose: 3000,
                            })}
                          >
                            No Resume
                          </button>
                        )}
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(a.status)}`}>
                          {getStatusIcon(a.status)}
                          {a.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: "0.4rem 0.9rem", fontSize: "0.82rem" }}
                          onClick={async () => {
                            setViewingApplicant(a);
                            setProfileData(null);
                            setProfileLoading(true);
                            try {
                              const res = await axios.get(
                                `${import.meta.env.VITE_API_BASE_URL}/profile/${a.userId}`,
                                { headers: { Authorization: `Bearer ${token}` } }
                              );
                              setProfileData(res.data);
                            } catch {
                              setProfileData(null);
                            } finally {
                              setProfileLoading(false);
                            }
                          }}
                        >
                          <FiUser /> View
                        </button>
                      </td>
                      <td>
                        <select
                          className="status-select"
                          value={a.status}
                          onChange={(e) => handleStatusChange(a, e.target.value)}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>                
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

 {/* Mobile Card View */}
{!loading && filteredApplicants.length > 0 && (
  <div className="mobile-cards">
    {paginatedApplicants.map((a) => (
      <div
        key={a._id}
        className={`applicant-card ${selectedIds.includes(a._id) ? 'selected' : ''}`}
      >
        {/* Card Header: checkbox + name + email */}
        <div className="card-header">
          <div className="card-checkbox">
            <input
              type="checkbox"
              checked={selectedIds.includes(a._id)}
              onChange={() => toggleRow(a._id)}
            />
            <div>
              <h3 className="card-name">{a.name}</h3>
              <p style={{ margin: "2px 0 0", fontSize: "0.78rem", color: "#718096", fontWeight: 400 }}>
                {a.email}
              </p>
            </div>
          </div>
          {/* Status badge top-right */}
          <span className={`status-badge ${getStatusClass(a.status)}`}
            style={{ fontSize: "0.72rem", padding: "0.3rem 0.7rem" }}>
            {getStatusIcon(a.status)}
            {a.status}
          </span>
        </div>

        {/* Card Body */}
        <div className="card-body">
          <div className="card-row">
            <FiBriefcase size={14} />
            <span>{a.jobTitle}</span>
          </div>
          <div className="card-row">
            <FiClock size={14} />
            <span>{calculateExperience(a.experience)} experience</span>
          </div>
        </div>

        {/* Card Footer: action buttons + status changer */}
        <div className="card-footer">
          <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
            {/* View Profile button */}
            <button
              className="btn btn-secondary"
              style={{ flex: 1, padding: "0.45rem 0.5rem", fontSize: "0.82rem", justifyContent: "center" }}
              onClick={async () => {
                setViewingApplicant(a);
                setProfileData(null);
                setProfileLoading(true);
                try {
                  const res = await axios.get(
                    `${import.meta.env.VITE_API_BASE_URL}/profile/${a.userId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                  setProfileData(res.data);
                } catch {
                  setProfileData(null);
                } finally {
                  setProfileLoading(false);
                }
              }}
            >
              <FiUser size={13} /> Profile
            </button>

            {/* Resume button */}
            {a.resumeUrl ? (<a
              
                href={a.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1, textDecoration: "none" }}
              >
                <button
                  className="btn btn-secondary"
                  style={{ width: "100%", padding: "0.45rem 0.5rem", fontSize: "0.82rem", justifyContent: "center" }}
                >
                  <FiExternalLink size={13} /> Resume
                </button>
              </a>
            ) : (
              <button
                className="btn"
                style={{
                  flex: 1, padding: "0.45rem 0.5rem", fontSize: "0.82rem",
                  background: "#f7fafc", color: "#a0aec0",
                  border: "2px solid #e2e8f0", justifyContent: "center"
                }}
                onClick={() => toast.info("Resume not uploaded", { position: "top-right", autoClose: 3000 })}
              >
                No Resume
              </button>
            )}
          </div>

          {/* Status changer */}
          <select
            className="status-select"
            style={{ width: "100%", fontSize: "0.88rem" }}
            value={a.status}
            onChange={(e) => handleStatusChange(a, e.target.value)}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    ))}
  </div>
)}

        {/* Empty State */}
        {!loading && filteredApplicants.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">
              <FiUser />
            </div>
            <h3>No applicants found</h3>
            <p>
              {searchTerm || statusFilter
                ? "Try adjusting your search or filters"
                : "No applicants available at the moment"}
            </p>
          </div>
        )}
{filteredApplicants.length > ROWS_PER_PAGE && (
  <div style={{
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginBottom: "1rem"
  }}>
    <button
      className="btn btn-secondary"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(p => p - 1)}
    >
      Prev
    </button>

    <span style={{ padding: "0.6rem 1rem", fontWeight: "600" }}>
      Page {currentPage} of {totalPages}
    </span>

    <button
      className="btn btn-secondary"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(p => p + 1)}
    >
      Next
    </button>
  </div>
)}

        {/* Action Buttons */}
        {!loading && applicants.length > 0 && (
          <div className="action-buttons">
            <button 
              className="btn btn-secondary" 
              onClick={handleSelectAll}
            >
              <FiCheckSquare />
              {selectedIds.length === filteredApplicants.length ? 'Deselect All' : 'Select All'}
            </button>

            <button
  className="btn btn-primary"
  disabled={!selectedIds.length}
//   onClick={() =>
//   navigate("/schedule-interview", {
//     state: {
//       applicants: applicants.filter(a =>
//         selectedIds.includes(a._id)
//       ),
//       jobId: applicants.find(a =>
//         selectedIds.includes(a._id)
//       )?.jobId
//     }
//   })
// }
onClick={() => {
  const selectedApplicants = applicants.filter(a =>
    selectedIds.includes(a._id)
  );

  navigate("/schedule-interview", {
    state: {
      applicants: selectedApplicants.map(a => ({
        applicationId: a._id,   // for Interview model
        userId: a.userId,       // required
        email: a.email,
        name: a.name,
        jobTitle: a.jobTitle,
        jobId: a.jobId
      })),
      jobId: selectedApplicants[0]?.jobId
    }
  });
}}

>
  <FiCalendar />
  Schedule Interview ({selectedIds.length})
</button>


            <button 
              className="btn btn-success" 
              onClick={exportApplicantsToCSV}
            >
              <FiDownload />
              Export CSV
            </button>
          </div>
        )}
      </div>
      {/* ── APPLICANT DETAILS MODAL ── */}
{viewingApplicant && (
  <div
    style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: "16px",
    }}
    onClick={() => { setViewingApplicant(null); setProfileData(null); }}
  >
    <div
      style={{
        background: "white", borderRadius: "16px",
        width: "100%", maxWidth: "520px",
        maxHeight: "85vh", overflowY: "auto",
        padding: "32px", position: "relative",
        boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        animation: "modalFadeIn 0.25s ease-out",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close */}
      <button
        onClick={() => { setViewingApplicant(null); setProfileData(null); }}
        style={{
          position: "absolute", top: "16px", right: "16px",
          background: "#f1f5f9", border: "none", borderRadius: "50%",
          width: "32px", height: "32px", cursor: "pointer",
          fontSize: "16px", display: "flex", alignItems: "center",
          justifyContent: "center", color: "#64748b",
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#e2e8f0"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#f1f5f9"}
      >✕</button>

{/* Avatar + Name */}
<div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
  <img
    src={profileData?.photoUrl || null}
    alt="avatar"
    onError={(e) => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
    style={{
      width: "60px", height: "60px", borderRadius: "50%",
      objectFit: "cover", border: "2px solid #e2e8f0",
      display: profileData?.photoUrl ? "block" : "none", flexShrink: 0,
    }}
  />
  <div style={{
    width: "60px", height: "60px", borderRadius: "50%", flexShrink: 0,
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    display: profileData?.photoUrl ? "none" : "flex",
    alignItems: "center", justifyContent: "center",
    color: "white", fontSize: "22px", fontWeight: "700",
  }}>
    {viewingApplicant.name?.trim()?.[0]?.toUpperCase() || "?"}
  </div>
  <div>
    <h3 style={{ margin: 0, fontWeight: "700", fontSize: "1.2rem", color: "#1e293b" }}>
      {profileData?.name || viewingApplicant.name}
    </h3>
    <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "13px" }}>
      {viewingApplicant.email}
    </p>
    {profileData?.skills?.primarySkills && (
      <p style={{ margin: "4px 0 0", color: "#667eea", fontSize: "12px", fontWeight: "600" }}>
        {profileData.skills.primarySkills.split(",").slice(0, 3).join(" · ")}
      </p>
    )}
  </div>
</div>

{profileLoading ? (
  <div style={{ textAlign: "center", padding: "32px", color: "#94a3b8" }}>
    <div style={{ width: "36px", height: "36px", border: "3px solid #e2e8f0", borderTop: "3px solid #667eea", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
    Loading profile...
  </div>
) : (
  <>
    {/* Basic Info Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
      {[
        ["💼 Applied For",  viewingApplicant.jobTitle],
        ["📊 Status",       viewingApplicant.status],
        ["📍 Location",     profileData?.location || "—"],
        ["📱 Mobile",       profileData?.mobile || "—"],
        ["⏱ Experience",    calculateExperience(viewingApplicant.experience)],
        ["📄 Resume",       viewingApplicant.resumeUrl ? "Uploaded" : "Not uploaded"],
      ].map(([label, value]) => (
        <div key={label} style={{
          background: "#f8fafc", borderRadius: "10px",
          padding: "10px 12px", border: "1px solid #e2e8f0",
        }}>
          <div style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "3px" }}>
            {label}
          </div>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#1e293b" }}>
            {value || "—"}
          </div>
        </div>
      ))}
    </div>

    {/* Skills */}
    {profileData?.skills?.primarySkills && (
      <div style={{ marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600", marginBottom: "8px" }}>
          Skills
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {profileData.skills.primarySkills.split(",").map((s, i) => (
            <span key={i} style={{
              background: "#ede9fe", color: "#6d28d9",
              padding: "4px 10px", borderRadius: "20px",
              fontSize: "12px", fontWeight: "500",
            }}>
              {s.trim()}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Education */}
    {profileData?.education?.length > 0 && (
      <div style={{ marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600", marginBottom: "8px" }}>
          Education
        </p>
        {profileData.education.slice(0, 2).map((ed, i) => (
          <div key={i} style={{
            background: "#f8fafc", borderRadius: "10px",
            padding: "10px 12px", marginBottom: "6px",
            border: "1px solid #e2e8f0",
          }}>
            <div style={{ fontWeight: "600", fontSize: "13px", color: "#1e293b" }}>{ed.degree || "—"}</div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
              {ed.institute || "—"} {ed.startYear && ed.endYear ? `(${ed.startYear} – ${ed.endYear})` : ""}
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Experience */}
    {viewingApplicant.experience?.length > 0 && (
      <div style={{ marginBottom: "16px" }}>
        <p style={{ fontSize: "11px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.5px", fontWeight: "600", marginBottom: "8px" }}>
          Experience
        </p>
        {viewingApplicant.experience.slice(0, 2).map((exp, i) => (
          <div key={i} style={{
            background: "#f8fafc", borderRadius: "10px",
            padding: "10px 12px", marginBottom: "6px",
            border: "1px solid #e2e8f0",
          }}>
            <div style={{ fontWeight: "600", fontSize: "13px", color: "#1e293b" }}>
              {exp.position || "—"}{exp.company ? ` @ ${exp.company}` : ""}
            </div>
            <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
              {exp.startDate ? new Date(exp.startDate).getFullYear() : "?"} — {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Resume button */}
    {viewingApplicant.resumeUrl && (
      <a href={viewingApplicant.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        <button style={{
          width: "100%", padding: "11px", borderRadius: "10px",
          border: "2px solid #667eea", background: "white",
          color: "#667eea", fontWeight: "600", fontSize: "14px",
          cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "8px", transition: "all 0.2s",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#667eea"; e.currentTarget.style.color = "white"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = "#667eea"; }}
        >
          <FiExternalLink /> View Resume
        </button>
      </a>
    )}
  </>
)}

{/* Close footer */}
<div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
  <button
    onClick={() => { setViewingApplicant(null); setProfileData(null); }}
    style={{
      padding: "10px 24px", borderRadius: "10px",
      border: "2px solid #e2e8f0", background: "white",
      fontWeight: "600", fontSize: "14px",
      cursor: "pointer", color: "#475569", transition: "all 0.2s",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = "white"; }}
  >
    Close
  </button>
</div>
    </div>
  </div>
)}
    </>
  );
};

export default Applicants;