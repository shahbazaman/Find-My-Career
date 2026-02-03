import React, { useState, useRef, useEffect } from "react";
import { 
  BsUpload, BsCheckCircleFill, BsBriefcase, BsGeoAlt, 
  BsCurrencyDollar, BsCalendar, BsExclamationTriangle, 
  BsArrowLeft, BsXCircle, BsBuilding, BsLaptop 
} from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJobForm = () => {
  // --- STATE MANAGEMENT ---
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    companyName: "", jobTitle: "", jobType: "", location: "",
    workMode: "", salaryMin: "", salaryMax: "", experienceMin: "",
    experienceMax: "", deadline: "", description: "", requirements: "",
    benefits: "", companyLogo: null
  });

  const [uiState, setUiState] = useState({
    loading: false,
    error: null,
    success: false,
    dragActive: false
  });

  const [logoPreview, setLogoPreview] = useState(null);

  // --- HANDLERS & LOGIC ---

  // 1. Handle Text Inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors when user types
    if (uiState.error) setUiState(prev => ({ ...prev, error: null }));
  };

  // 2. File Validation & Preview Logic
  const handleFileChange = (file) => {
    if (!file) return;

    // Logic: Validate File Size (Max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setUiState(prev => ({ ...prev, error: "File is too large. Max limit is 2MB." }));
      window.scrollTo(0, 0);
      return;
    }

    // Logic: Validate File Type
    if (!file.type.startsWith("image/")) {
      setUiState(prev => ({ ...prev, error: "Please upload a valid image file." }));
      return;
    }

    // Generate Preview
    const reader = new FileReader();
    reader.onloadend = () => setLogoPreview(reader.result);
    reader.readAsDataURL(file);

    setFormData(prev => ({ ...prev, companyLogo: file }));
    setUiState(prev => ({ ...prev, error: null }));
  };

  // 3. Drag & Drop Logic
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setUiState(prev => ({ ...prev, dragActive: true }));
    } else if (e.type === "dragleave") {
      setUiState(prev => ({ ...prev, dragActive: false }));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUiState(prev => ({ ...prev, dragActive: false }));
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  // 4. Remove Logo Logic
  const removeLogo = (e) => {
    e.stopPropagation();
    setFormData(prev => ({ ...prev, companyLogo: null }));
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // 5. Submission Logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUiState(prev => ({ ...prev, loading: true, error: null }));

    // Logic: Cross-field Validation
    if (Number(formData.salaryMin) > Number(formData.salaryMax)) {
      setUiState(prev => ({ ...prev, loading: false, error: "Minimum salary cannot be greater than Maximum salary." }));
      window.scrollTo(0, 0);
      return;
    }

    try {
      // Logic: Convert to FormData for File Upload
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "companyLogo") {
          if (formData.companyLogo) data.append("companyLogo", formData.companyLogo);
        } else if (key === "benefits") {
          // Logic: Convert comma string to array
          const benefitsArray = formData.benefits.split(",").map(item => item.trim()).filter(i => i);
          data.append("benefits", JSON.stringify(benefitsArray));
        } else {
          data.append(key, formData[key]);
        }
      });

      // API Call
      await axios.post("${import.meta.env.VITE_API_BASE_URL}/jobs", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUiState(prev => ({ ...prev, loading: false, success: true }));
      
      // Redirect after success
      setTimeout(() => navigate("/admin"), 2000);

    } catch (err) {
      console.error(err);
      setUiState(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.response?.data?.message || "Something went wrong. Please check your connection." 
      }));
      window.scrollTo(0, 0);
    }
  };

  // --- RENDER ---
  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* Top Navigation */}
        <button type="button" onClick={() => navigate(-1)} className="back-btn">
          <BsArrowLeft /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="header">
          <div className="icon-box">
            <BsBriefcase size={28} />
          </div>
          <h1>Create New Job Posting</h1>
          <p>Target the right candidates by filling in clear details.</p>
        </div>

        {/* Global Error Message */}
        {uiState.error && (
          <div className="alert error">
            <BsExclamationTriangle size={20} />
            <span>{uiState.error}</span>
          </div>
        )}

        {/* Success Message */}
        {uiState.success && (
          <div className="alert success">
            <BsCheckCircleFill size={20} />
            <span>Job posted successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-content">
          
          {/* Section 1: Company Details */}
          <div className="section">
            <h3 className="section-title"><BsBuilding /> Company Details</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Company Name <span className="req">*</span></label>
                <input 
                  type="text" name="companyName" 
                  value={formData.companyName} onChange={handleChange} 
                  placeholder="e.g. Acme Corp" required 
                />
              </div>
              <div className="form-group">
                <label>Job Title <span className="req">*</span></label>
                <input 
                  type="text" name="jobTitle" 
                  value={formData.jobTitle} onChange={handleChange} 
                  placeholder="e.g. Senior Frontend Engineer" required 
                />
              </div>
            </div>
            
            <div className="grid-3">
              <div className="form-group">
                <label>Job Type <span className="req">*</span></label>
                <select name="jobType" value={formData.jobType} onChange={handleChange} required>
                  <option value="">Select Type</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="form-group">
                <label>Work Mode <span className="req">*</span></label>
                <select name="workMode" value={formData.workMode} onChange={handleChange} required>
                  <option value="">Select Mode</option>
                  <option value="Remote">Remote</option>
                  <option value="On-Site">On-Site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              <div className="form-group">
                <label>Location <span className="req">*</span></label>
                <div className="input-icon-wrap">
                  <BsGeoAlt className="input-icon" />
                  <input 
                    type="text" name="location" 
                    value={formData.location} onChange={handleChange} 
                    placeholder="City, Country" required 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Timeline & Salary */}
          <div className="section">
            <h3 className="section-title"><BsCurrencyDollar /> Compensation & Timeline</h3>
            <div className="grid-2">
              <div className="form-group">
                <label>Application Deadline <span className="req">*</span></label>
                <div className="input-icon-wrap">
                  <BsCalendar className="input-icon" />
                  <input 
                    type="date" name="deadline" 
                    min={new Date().toISOString().split("T")[0]} // Logic: Disable past dates
                    value={formData.deadline} onChange={handleChange} required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Experience (Years)</label>
                <div className="range-inputs">
                  <input 
                    type="number" name="experienceMin" 
                    placeholder="Min" value={formData.experienceMin} onChange={handleChange} 
                  />
                  <span className="separator">-</span>
                  <input 
                    type="number" name="experienceMax" 
                    placeholder="Max" value={formData.experienceMax} onChange={handleChange} 
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Salary Range (Annual)</label>
              <div className="range-inputs">
                <div className="input-icon-wrap" style={{ flex: 1 }}>
                  <BsCurrencyDollar className="input-icon" />
                  <input 
                    type="number" name="salaryMin" 
                    placeholder="Minimum" value={formData.salaryMin} onChange={handleChange} 
                  />
                </div>
                <span className="separator">to</span>
                <div className="input-icon-wrap" style={{ flex: 1 }}>
                  <BsCurrencyDollar className="input-icon" />
                  <input 
                    type="number" name="salaryMax" 
                    placeholder="Maximum" value={formData.salaryMax} onChange={handleChange} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Detailed Info */}
          <div className="section">
            <h3 className="section-title"><BsLaptop /> Job Description</h3>
            <div className="form-group">
              <label>Description <span className="req">*</span></label>
              <textarea 
                name="description" rows="5" 
                value={formData.description} onChange={handleChange} 
                placeholder="Enter detailed job responsibilities..." required 
              />
            </div>
            <div className="form-group">
              <label>Requirements</label>
              <textarea 
                name="requirements" rows="4" 
                value={formData.requirements} onChange={handleChange} 
                placeholder="List skills, tools, and qualifications..." 
              />
            </div>
            <div className="form-group">
              <label>Benefits & Perks (Comma separated)</label>
              <textarea 
                name="benefits" rows="2" 
                value={formData.benefits} onChange={handleChange} 
                placeholder="e.g. Health Insurance, Gym Membership, Free Coffee" 
              />
            </div>
          </div>

          {/* Section 4: Branding / Logo */}
          <div className="section">
            <h3 className="section-title"><BsUpload /> Company Branding</h3>
            <div 
              className={`drop-zone ${uiState.dragActive ? "active" : ""}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={(e) => handleFileChange(e.target.files[0])} 
                hidden 
              />
              
              {logoPreview ? (
                <div className="preview-container">
                  <img src={logoPreview} alt="Logo Preview" />
                  <button type="button" onClick={removeLogo} className="remove-btn">
                    <BsXCircle /> Remove
                  </button>
                  <p className="file-name">{formData.companyLogo?.name}</p>
                </div>
              ) : (
                <div className="upload-prompt" onClick={() => fileInputRef.current.click()}>
                  <div className="upload-icon-circle">
                    <BsUpload />
                  </div>
                  <p className="prompt-text"><strong>Click to upload</strong> or drag and drop</p>
                  <p className="prompt-sub">SVG, PNG, JPG (max. 2MB)</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button 
              type="submit" 
              className={`submit-btn ${uiState.loading ? "loading" : ""}`}
              disabled={uiState.loading}
            >
              {uiState.loading ? (
                <>Posting Job...</>
              ) : (
                <><BsCheckCircleFill /> Publish Job Now</>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* --- STYLES --- */}
      <style>{`
        /* Global Reset & Vars */
        .page-wrapper {
          min-height: 100vh;
          background-color: #f8fafc;
          padding: 40px 20px;
          font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          display: flex;
          justify-content: center;
        }

        .container {
          max-width: 900px;
          width: 100%;
        }

        /* Header Styles */
        .back-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #64748b;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 20px;
          transition: 0.2s;
        }
        .back-btn:hover { color: #3b82f6; transform: translateX(-4px); }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .icon-box {
          width: 60px; height: 60px;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          color: white;
          margin: 0 auto 15px;
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2);
        }
        .header h1 { margin: 0; color: #1e293b; font-size: 28px; font-weight: 800; }
        .header p { color: #64748b; margin-top: 8px; }

        /* Form Card & Sections */
        .form-content {
          background: white;
          border-radius: 20px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .section {
          padding: 30px;
          border-bottom: 1px solid #e2e8f0;
        }
        .section:last-child { border-bottom: none; }
        
        .section-title {
          margin: 0 0 20px;
          font-size: 18px;
          color: #334155;
          display: flex; align-items: center; gap: 10px;
        }

        /* Alerts */
        .alert {
          padding: 16px;
          border-radius: 12px;
          margin-bottom: 20px;
          display: flex; align-items: center; gap: 12px;
          font-weight: 500;
          animation: slideDown 0.3s ease;
        }
        .alert.error { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }
        .alert.success { background: #f0fdf4; color: #16a34a; border: 1px solid #dcfce7; }

        /* Inputs & Grids */
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        
        .form-group { margin-bottom: 20px; }
        .form-group:last-child { margin-bottom: 0; }
        
        label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #475569;
          margin-bottom: 8px;
        }
        .req { color: #ef4444; }

        input, select, textarea {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 15px;
          color: #1e293b;
          transition: all 0.2s;
          box-sizing: border-box;
          font-family: inherit;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #3b82f6;
          outline: none;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Icon Inputs */
        .input-icon-wrap { position: relative; }
        .input-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #94a3b8; }
        .input-icon-wrap input { padding-left: 40px; }

        /* Range Inputs */
        .range-inputs { display: flex; align-items: center; gap: 10px; }
        .separator { color: #94a3b8; font-weight: 500; font-size: 14px; }

        /* File Upload */
        .drop-zone {
          border: 2px dashed #cbd5e0;
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          background: #f8fafc;
          transition: 0.3s;
          cursor: pointer;
        }
        .drop-zone.active, .drop-zone:hover {
          border-color: #3b82f6;
          background: #eff6ff;
        }
        .upload-icon-circle {
          width: 48px; height: 48px;
          background: #dbeafe;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 12px;
          color: #2563eb; font-size: 20px;
        }
        .prompt-text { color: #1e293b; margin: 0; }
        .prompt-sub { color: #94a3b8; font-size: 13px; margin-top: 5px; }

        .preview-container { text-align: center; }
        .preview-container img { max-height: 100px; margin-bottom: 10px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .file-name { font-size: 13px; color: #64748b; margin-top: 5px; }
        .remove-btn {
          background: #fee2e2; color: #dc2626;
          border: none; padding: 6px 12px;
          border-radius: 20px; font-size: 12px; font-weight: 600;
          cursor: pointer; display: inline-flex; align-items: center; gap: 5px;
        }

        /* Submit Area */
        .form-actions { padding: 30px; background: #f8fafc; border-top: 1px solid #e2e8f0; }
        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(to right, #2563eb, #1d4ed8);
          color: white;
          border: none; border-radius: 10px;
          font-size: 16px; font-weight: 700;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: 0.3s;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .submit-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 15px rgba(37, 99, 235, 0.4); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

        @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

        /* Responsive */
        @media (max-width: 768px) {
          .grid-2, .grid-3 { grid-template-columns: 1fr; }
          .range-inputs { flex-direction: column; align-items: stretch; }
          .separator { text-align: center; }
          .container { padding: 0; }
          .form-content { border-radius: 0; box-shadow: none; }
          .section { padding: 20px; }
        }
      `}</style>
    </div>
  );
};

export default AddJobForm;