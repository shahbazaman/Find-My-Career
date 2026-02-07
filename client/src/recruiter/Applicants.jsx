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
  FiFileText
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
          border-radius:20px;
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
          padding: 10px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          margin-bottom: 1rem;
        }

        .controls-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .search-box {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-box input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.95rem;
          transition: all 0.2s;
          background: #f7fafc;
        }

        .search-box input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
          font-size: 1.1rem;
        }

        .filter-box {
          min-width: 200px;
          position: relative;
        }

        .filter-box select {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 0.95rem;
          background: #f7fafc;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-box select:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .filter-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #a0aec0;
          font-size: 1.1rem;
          pointer-events: none;
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
          overflow-x: auto;
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
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          white-space: nowrap;
        }

        .status-applied {
          background: #ebf8ff;
          color: #2c5282;
        }

        .status-shortlisted {
          background: #fef5e7;
          color: #d97706;
        }

        .status-interview {
          background: #f0e7fe;
          color: #6b21a8;
        }

        .status-rejected {
          background: #fee;
          color: #c53030;
        }

        .status-hired {
          background: #d4edda;
          color: #155724;
        }

        .status-default {
          background: #e2e8f0;
          color: #4a5568;
        }

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

        .status-select:hover {
          border-color: #cbd5e0;
        }

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

        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

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

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

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

        .empty-state h3 {
          color: #2d3748;
          margin: 0 0 0.5rem 0;
        }

        .empty-state p {
          color: #718096;
          margin: 0;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .applicants-header h1 {
            font-size: 1.75rem;
          }

          .stats-bar {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        }

        @media (max-width: 768px) {
          .applicants-container {
            padding: 1rem;
          }

          .applicants-header h1 {
            font-size: 1.5rem;
          }

          .controls-panel {
            padding: 1rem;
          }

          .controls-row {
            flex-direction: column;
          }

          .search-box,
          .filter-box {
            width: 100%;
            min-width: unset;
          }

          .action-buttons {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            justify-content: center;
          }

          /* Hide table on mobile, show cards instead */
          .table-wrapper {
            display: none;
          }

          .mobile-cards {
            display: block;
          }
        }

        /* Mobile Card View */
        .mobile-cards {
          display: none;
        }

        .applicant-card {
          background: white;
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1rem;
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
          font-size: 1.1rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .card-body {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .card-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #4a5568;
          font-size: 0.9rem;
        }

        .card-row svg {
          color: #718096;
        }

        .card-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 1px solid #e2e8f0;
        }
          /* ===== INTERVIEW MODAL OVERLAY ===== */
.interview-modal-overlay {
  position: fixed;
  inset: 0; /* top:0 right:0 bottom:0 left:0 */
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== MODAL BOX ===== */
.interview-modal {
  background: #ffffff;
  width: 100%;
  max-width: 520px;
  border-radius: 12px;
  padding: 1.5rem;

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);

  position: relative;
  animation: modalFadeIn 0.25s ease-out;
}

/* ===== ANIMATION ===== */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* ===== CLOSE BUTTON (optional) ===== */
.interview-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

/* ===== MOBILE SAFE ===== */
@media (max-width: 480px) {
  .interview-modal {
    max-width: 92%;
    padding: 1rem;
  }
}

.table-wrapper {
  max-height: 600px;          /* controls visible height */
  overflow-y: auto;
  overflow-x: auto;
}

/* Keep header sticky while scrolling */
.table-wrapper thead th {
  position: sticky;
  top: 0;
  z-index: 2;
}
        @media (max-width: 768px) {
          .mobile-cards {
            display: block;
          }

          .table-wrapper table {
            display: none;
          }
        }

        @media (min-width: 769px) {
          .mobile-cards {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .stats-bar {
            grid-template-columns: 1fr;
          }

          .applicants-header h1 {
            font-size: 1.25rem;
          }

          .stat-card {
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
                placeholder="Search by name or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="filter-box me-2">
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
                    <th>Status</th>
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
                        <span className={`status-badge ${getStatusClass(a.status)}`}>
                          {getStatusIcon(a.status)}
                          {a.status}
                        </span>
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
                <div className="card-header">
                  <div className="card-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(a._id)}
                      onChange={() => toggleRow(a._id)}
                    />
                    <h3 className="card-name">{a.name}</h3>
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="card-row">
                    <FiBriefcase />
                    <span>{a.jobTitle}</span>
                  </div>
                  <div className="card-row">
                    <FiClock />
                    <span>{calculateExperience(a.experience)} experience</span>
                  </div>
                  <div className="card-row">
                    <span className={`status-badge ${getStatusClass(a.status)}`}>
                      {getStatusIcon(a.status)}
                      {a.status}
                    </span>
                  </div>
                </div>
                
                <div className="card-footer">
                  <select
                    className="status-select"
                    style={{ width: '100%' }}
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
  onClick={() =>
  navigate("/schedule-interview", {
    state: {
      applicants: applicants.filter(a =>
        selectedIds.includes(a._id)
      ),
      jobId: applicants.find(a =>
        selectedIds.includes(a._id)
      )?.jobId
    }
  })
}
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
    </>
  );
};

export default Applicants;