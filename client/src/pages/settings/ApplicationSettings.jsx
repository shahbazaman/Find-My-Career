import { useState, useEffect } from "react";
import axios from "axios";

import { FaFileUpload, FaHistory, FaFileAlt, FaCheckCircle, FaRobot, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function ApplicationSettings() {
  const [autoApply, setAutoApply] = useState(false);
  const [useDefaultResume, setUseDefaultResume] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [currentResume, setCurrentResume] = useState("Software_Engineer_Resume_2024.pdf");
const userData = localStorage.getItem("user");
const userId = userData ? JSON.parse(userData).id : null;
  const [resumeUrl, setResumeUrl] = useState("");
  const navigate = useNavigate();
  const [stats, setStats] = useState({
  total: 0,
  inReview: 0,
  interviews: 0
});

  const [showPreview, setShowPreview] = useState(false); // ✅ modal state
 useEffect(() => {
  const loadProfileResume = async () => {
    const token = localStorage.getItem("token");
    
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.data?.resumeUrl) {
        setResumeUrl(res.data.resumeUrl);
        // This splits the URL to get the filename
        const fileName = res.data.resumeUrl.split("/").pop();
        setCurrentResume(fileName);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  if (userId) {
    loadProfileResume();
  }
}, [userId]);

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "${import.meta.env.VITE_API_BASE_URL}/applications/my/stats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setStats(res.data);
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  fetchStats();
}, []);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          setCurrentResume(file.name);
          setTimeout(() => setUploadSuccess(false), 3000);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="application-container mt-5">
      {/* Success Alert */}
      {uploadSuccess && (
        <div className="success-alert slide-down">
          <div className="success-icon">
            <FaCheckCircle />
          </div>
          <div>
            <p className="success-title">Resume uploaded successfully!</p>
            <p className="success-subtitle">Your new resume is now active and ready to use.</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="settings-header fade-in">
        <div className="header-icon-wrapper">
          <div className="header-icon-glow"></div>
          <div className="header-icon">
            <FaFileAlt />
          </div>
        </div>
        <div>
          <h3 className="settings-title">Application Settings</h3>
          <p className="settings-subtitle">Manage your job applications and resume</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="settings-card fade-in-up">
        <div className="settings-card-content">
          
          {/* Current Resume Section */}
{/* Current Resume Section */}
<div className="resume-status slide-right" style={{ animationDelay: '0.1s', position: 'relative', zIndex: 1 }}>
  <div className="resume-info">
    <div className="resume-icon">
      <FaFileAlt />
    </div>
    <div className="resume-details">
      <span className="resume-label">Current Resume</span>
      <span className="resume-name">{currentResume || "No resume uploaded"}</span>
    </div>
  </div>

  <div className="resume-actions" style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
    <button
  type="button"
  className="resume-badge-action"
  style={{
    cursor: resumeUrl ? "pointer" : "wait",
    backgroundColor: resumeUrl ? "#10b981" : "#64748b",
    marginLeft: "auto",
    opacity: 1, // Always visible
    border: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '9999px',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    zIndex: 99 // Ensures it is on top
  }}
  onClick={() => resumeUrl && setShowPreview(true)}
>
  <FaEye /> {resumeUrl ? "View Resume" : "Fetching..."}
</button>

    <div className="resume-badge">
      <FaCheckCircle /> Active
    </div>
  </div>
</div>
          {/* Stats Section */}
          <div className="stats-grid fade-in" style={{animationDelay: '0.5s'}}>
  <div className="stat-card">
    <div className="stat-number">{stats.total}</div>
    <div className="stat-label">Applications Sent</div>
  </div>
  <div className="stat-card">
    <div className="stat-number">{stats.inReview}</div>
    <div className="stat-label">In Review</div>
  </div>
  <div className="stat-card">
    <div className="stat-number">{stats.interviews}</div>
    <div className="stat-label">Interviews</div>
  </div>
</div>
        </div>

      </div>
{showPreview && resumeUrl && (
        <div className="resume-modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setShowPreview(false)}
            >
              <FaTimes />
            </button>

            <h4 className="modal-title">Resume Preview</h4>

            <div className="modal-body">
              {resumeUrl ? (
                <>
                  {/* {resumeUrl.toLowerCase().endsWith(".pdf") ? (
                    <iframe
                      src={`https://docs.google.com/gview?url=${encodeURIComponent(resumeUrl)}&embedded=true`}
                      width="100%"
                      height="500px"
                      style={{ border: "none", borderRadius: "8px" }}
                      title="Resume Preview"
                    />
                  ) : (
                    <div className="doc-preview">
                      <FaFileAlt size={48} color="#3b82f6" />
                      <p style={{ marginTop: "1rem", color: "#64748b" }}>
                        Preview not available for this file type.
                      </p>
                    </div>
                  )} */}
                  {/* Inside your Modal Preview Section */}
{resumeUrl.toLowerCase().endsWith(".pdf") ? (
  <iframe
    src={resumeUrl} // Try loading directly first
    width="100%"
    height="500px"
    style={{ border: "none", borderRadius: "8px" }}
    title="Resume Preview"
  />
) : (
  <div className="doc-preview">
    <FaFileAlt size={48} />
    <p>Preview not available.</p>
  </div>
)}
                  <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="primary-btn"
                      style={{ textDecoration: "none", display: "inline-flex" }}
                    >
                      <FaFileUpload /> Open in New Tab / Download
                    </a>
                  </div>
                </>
              ) : (
                <p>No resume URL found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
      /* This ensures the button is high enough to be "reachable" by your mouse */
.resume-status {
  position: relative;
  z-index: 5;
}

.resume-badge-action {
  pointer-events: auto !important;
  transition: transform 0.2s ease;
}

.resume-badge-action:hover {
  transform: scale(1.05);
  filter: brightness(1.1);
}
        .application-container {
          max-width: 80rem;
          margin: 0 auto;
        }
.resume-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 20; /* High z-index to stay above background glows */
}

.view-badge-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #3b82f6; /* Blue for 'View' */
  color: white;
  border: none;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;
  pointer-events: auto !important; /* Forces the browser to allow clicks */
}

.view-badge-btn:hover {
  background: #2563eb;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.resume-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999 !important; /* Highest possible value */
}

.resume-modal {
  background: white;
  border-radius: 1.5rem;
  width: 95%;
  max-width: 900px;
  max-height: 90vh; /* Prevent modal from going off screen */
  padding: 2rem;
  position: relative;
  overflow-y: auto; /* Allow scrolling if iframe is big */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-body {
  width: 100%;
  display: flex;
  flex-direction: column;
}

        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
        }

        .modal-title {
          margin-bottom: 1rem;
          font-weight: 700;
          color: #1e293b;
        }

        .doc-preview {
          text-align: center;
          padding: 3rem 1rem;
          color: #64748b;
        }
        /* Success Alert */
        .success-alert {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border: 2px solid #6ee7b7;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .success-icon {
          padding: 0.5rem;
          background: #10b981;
          border-radius: 0.5rem;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
        }

        .success-title {
          font-weight: 600;
          color: #065f46;
          margin: 0;
        }

        .success-subtitle {
          font-size: 0.875rem;
          color: #047857;
          margin: 0.25rem 0 0 0;
        }

        /* Header */
        .settings-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .header-icon-wrapper {
          position: relative;
        }

        .header-icon-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 0.75rem;
          filter: blur(8px);
          opacity: 0.5;
        }

        .header-icon {
          position: relative;
          padding: 0.75rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
          color: white;
          font-size: 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .settings-title {
          font-size: 1.875rem;
          font-weight: 700;
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0;
        }

        .settings-subtitle {
          color: #64748b;
          font-size: 0.875rem;
          margin: 0.25rem 0 0 0;
        }

        /* Main Card */
        .settings-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(226, 232, 240, 0.5);
          overflow: hidden;
        }

        .settings-card-content {
          padding: 2rem;
        }

        /* Resume Status */
        /* Update these specific sections in your <style> tag */

.resume-status {
  position: relative; /* Add this */
  z-index: 1;         /* Add this */
  padding: 1.5rem;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 2px solid #93c5fd;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  gap: 1rem;
}

.resume-badge {
  position: relative; /* Add this */
  z-index: 10;        /* Make sure it's higher than the background */
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #10b981;
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer !important; /* Force the pointer cursor */
  pointer-events: auto !important; /* Ensure it accepts clicks */
}

        .resume-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .resume-icon {
          width: 3rem;
          height: 3rem;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.25rem;
          animation: float 3s ease-in-out infinite;
        }

        .resume-details {
          display: flex;
          flex-direction: column;
        }

        .resume-label {
          font-size: 0.75rem;
          color: #64748b;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .resume-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #1e293b;
          margin-top: 0.25rem;
        }
        .setting-section {
          margin-bottom: 2rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #f1f5f9;
        }

        .setting-section:last-of-type {
          border-bottom: none;
        }

        /* Toggle Row */
        .toggle-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .toggle-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
        }

        .toggle-icon {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }

        .toggle-icon.auto-apply {
          background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
          animation: robot-bounce 2s ease-in-out infinite;
        }

        .toggle-icon.default-resume {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        }

        .label-text {
          display: block;
          font-weight: 600;
          color: #1e293b;
          font-size: 1rem;
        }

        .label-subtext {
          display: block;
          font-size: 0.875rem;
          color: #64748b;
          margin-top: 0.25rem;
        }

        /* Toggle Switch */
        .toggle-switch {
          position: relative;
          width: 3.5rem;
          height: 2rem;
          cursor: pointer;
          flex-shrink: 0;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .toggle-slider {
          position: absolute;
          inset: 0;
          background: #cbd5e1;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }

        .toggle-slider:before {
          content: "";
          position: absolute;
          height: 1.5rem;
          width: 1.5rem;
          left: 0.25rem;
          top: 0.25rem;
          background: white;
          border-radius: 50%;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .toggle-switch input:checked + .toggle-slider {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        }

        .toggle-switch input:checked + .toggle-slider:before {
          transform: translateX(1.5rem);
        }

        .toggle-switch:hover .toggle-slider {
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);
        }

        /* Info Box */
        .info-box {
          margin-top: 1rem;
          padding: 0.875rem;
          background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
          border: 2px solid #fcd34d;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          color: #78350f;
        }

        .info-box p {
          margin: 0;
        }

        /* Upload Progress */
        .upload-progress {
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 2px solid #7dd3fc;
          border-radius: 1rem;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .progress-text {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0c4a6e;
        }

        .progress-percent {
          font-size: 0.875rem;
          font-weight: 700;
          color: #0369a1;
        }

        .progress-bar {
          height: 0.5rem;
          background: #cbd5e1;
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
          border-radius: 9999px;
          transition: width 0.3s ease;
          animation: shimmer 1.5s infinite;
        }

        /* Button Group */
        .button-group {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .secondary-btn,
        .primary-btn {
          padding: 1rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .secondary-btn {
          background: white;
          color: #3b82f6;
          border: 2px solid #3b82f6;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
        }

        .secondary-btn:hover {
          background: #3b82f6;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
        }

        .primary-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
        }

        .primary-btn:active,
        .secondary-btn:active {
          transform: translateY(0);
        }

        .upload-btn {
          margin: 0;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #f1f5f9;
        }

        .stat-card {
          padding: 1.5rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 2px solid #e2e8f0;
          border-radius: 1rem;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          border-color: #cbd5e1;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Footer */
        .settings-footer {
          padding: 1rem 2rem;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border-top: 1px solid rgba(226, 232, 240, 0.5);
        }

        .settings-footer p {
          margin: 0;
          text-align: center;
          font-size: 0.875rem;
          color: #064e3b;
        }

        /* Animations */
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulse-badge {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
        }

        @keyframes robot-bounce {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-4px) rotate(-5deg);
          }
          75% {
            transform: translateY(-4px) rotate(5deg);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .slide-down {
          animation: slide-down 0.4s ease-out;
        }

        .slide-right {
          animation: slide-right 0.5s ease-out backwards;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .settings-card-content {
            padding: 1.5rem;
          }

          .settings-header {
            flex-direction: column;
            align-items: flex-start;
          }

         

          .button-group {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}