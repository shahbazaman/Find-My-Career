import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { FaFileUpload, FaCheckCircle, FaArrowLeft, FaFilePdf } from "react-icons/fa";
import { BsCloudUploadFill } from "react-icons/bs";

const cloudName = "dcfdc10zg";
const RESUME_UPLOAD_PRESET = "resumeRaw";

export default function UploadResume() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = storedUser?.id;

  const [resumeUrl, setResumeUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  // Load existing resume on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`
        );
        if (res.data?.resumeUrl) {
          setResumeUrl(res.data.resumeUrl);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  const uploadResume = async (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5MB");
      return;
    }

    setFileName(file.name);
    setUploading(true);

    try {
      // Step 1: Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", RESUME_UPLOAD_PRESET);

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const url = cloudRes.data.secure_url;
      setResumeUrl(url);

      // Step 2: Save to backend profile
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`,
        { resumeUrl: url, userId }
      );

      toast.success("Resume uploaded successfully! 🎉");
    } catch (err) {
      console.error("Upload failed:", err?.response?.data || err);
      toast.error(err?.response?.data?.error?.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) uploadResume(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadResume(file);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
      padding: "clamp(20px, 5vw, 60px) clamp(16px, 4vw, 40px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <ToastContainer position="top-center" autoClose={3000} />

      <div style={{
        width: "100%",
        maxWidth: "560px",
      }}>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "white",
            padding: "10px 20px",
            borderRadius: "50px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "32px",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
          onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          <FaArrowLeft size={14} /> Back
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{
            width: "72px", height: "72px",
            background: "rgba(255,255,255,0.15)",
            borderRadius: "20px",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}>
            <BsCloudUploadFill size={34} color="white" />
          </div>
          <h1 style={{
            color: "white", fontSize: "clamp(1.6rem, 5vw, 2rem)",
            fontWeight: "800", margin: "0 0 10px",
          }}>
            Upload Your Resume
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "clamp(13px, 3vw, 15px)", margin: 0,
          }}>
            A resume is required to apply for jobs on this platform
          </p>
        </div>

        {/* Upload Card */}
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "clamp(24px, 5vw, 40px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
        }}>

          {/* Existing resume banner */}
          {resumeUrl && (
            <div style={{
              background: "linear-gradient(135deg, #ecfdf5, #d1fae5)",
              border: "2px solid #6ee7b7",
              borderRadius: "14px",
              padding: "16px 20px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}>
              <FaCheckCircle color="#10b981" size={22} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: "700", color: "#065f46", fontSize: "14px" }}>
                  Resume Already Uploaded
                </div>
                <div style={{ fontSize: "12px", color: "#047857", marginTop: "2px" }}>
                  You can replace it by uploading a new file below
                </div>
              </div>
              <button
                onClick={() => window.open(resumeUrl, "_blank")}
                style={{
                  background: "#10b981", color: "white",
                  border: "none", padding: "7px 14px",
                  borderRadius: "8px", cursor: "pointer",
                  fontSize: "12px", fontWeight: "600",
                  flexShrink: 0,
                }}
              >
                View
              </button>
            </div>
          )}

          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={{
              border: `2.5px dashed ${isDragging ? "#667eea" : "#cbd5e0"}`,
              borderRadius: "16px",
              padding: "clamp(32px, 6vw, 48px) 24px",
              textAlign: "center",
              background: isDragging ? "#f0f4ff" : "#f8fafc",
              transition: "all 0.3s ease",
              cursor: "pointer",
              marginBottom: "24px",
            }}
            onClick={() => document.getElementById("resume-upload-input").click()}
          >
            <input
              id="resume-upload-input"
              type="file"
              accept="application/pdf"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {uploading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div style={{
                  width: "52px", height: "52px",
                  border: "4px solid #e2e8f0",
                  borderTop: "4px solid #667eea",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
                <div style={{ fontWeight: "700", color: "#667eea", fontSize: "16px" }}>
                  Uploading...
                </div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                  {fileName}
                </div>
              </div>
            ) : (
              <>
                <FaFilePdf size={48} color={isDragging ? "#667eea" : "#cbd5e0"} style={{ marginBottom: "16px", transition: "color 0.3s" }} />
                <div style={{ fontWeight: "700", fontSize: "clamp(15px, 3vw, 17px)", color: "#2d3748", marginBottom: "8px" }}>
                  {isDragging ? "Drop your PDF here!" : "Drag & Drop your Resume"}
                </div>
                <div style={{ fontSize: "13px", color: "#718096", marginBottom: "20px" }}>
                  or click to browse files
                </div>
                <div style={{
                  display: "inline-block",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  padding: "11px 28px",
                  borderRadius: "50px",
                  fontSize: "14px",
                  fontWeight: "700",
                  boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
                }}>
                  <FaFileUpload style={{ marginRight: "8px", verticalAlign: "middle" }} />
                  Choose PDF File
                </div>
                <div style={{ fontSize: "12px", color: "#adb5bd", marginTop: "14px" }}>
                  PDF only • Max 5MB
                </div>
              </>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {resumeUrl && (
              <button
                onClick={() => navigate(-1)}
                style={{
                  flex: 1, minWidth: "120px",
                  padding: "14px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white", border: "none",
                  borderRadius: "12px", cursor: "pointer",
                  fontSize: "15px", fontWeight: "700",
                  boxShadow: "0 4px 15px rgba(102,126,234,0.4)",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "8px",
                }}
              >
                <FaCheckCircle /> Done — Go Back & Apply
              </button>
            )}
            {!resumeUrl && (
              <button
                onClick={() => navigate(-1)}
                style={{
                  flex: 1, minWidth: "120px",
                  padding: "14px",
                  background: "white", color: "#667eea",
                  border: "2px solid #667eea",
                  borderRadius: "12px", cursor: "pointer",
                  fontSize: "15px", fontWeight: "700",
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Tips */}
        <div style={{
          marginTop: "28px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "16px",
          padding: "20px 24px",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.15)",
        }}>
          <div style={{ color: "white", fontWeight: "700", marginBottom: "12px", fontSize: "14px" }}>
            💡 Tips for a great resume
          </div>
          {[
            "Keep it to 1–2 pages maximum",
            "Use a clean, ATS-friendly format",
            "Include your skills, experience and education",
            "Save as PDF before uploading",
          ].map((tip, i) => (
            <div key={i} style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "13px",
              display: "flex", alignItems: "flex-start",
              gap: "8px", marginBottom: "8px",
            }}>
              <span style={{ color: "#a78bfa", flexShrink: 0 }}>✓</span>
              {tip}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}