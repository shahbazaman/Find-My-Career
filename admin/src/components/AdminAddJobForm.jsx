import React, { useState } from "react";
import { BsUpload, BsCheckCircleFill, BsBriefcase, BsGeoAlt, BsCurrencyDollar, BsCalendar } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddJobForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobType: "",
    location: "",
    workMode: "",
    salaryMin: "",
    salaryMax: "",
    experienceMin: "",
    experienceMax: "",
    deadline: "",
    description: "",
    requirements: "",
    benefits: "",
    companyLogo: null
  });

  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, companyLogo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, companyLogo: file }));
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post("http://localhost:5000/api/jobs", {
      companyName: formData.companyName,
      jobTitle: formData.jobTitle,
      jobType: formData.jobType,
      location: formData.location,
      workMode: formData.workMode,
      salaryMin: Number(formData.salaryMin) || 0,
      salaryMax: Number(formData.salaryMax) || 0,
      experienceMin: Number(formData.experienceMin) || 0,
      experienceMax: Number(formData.experienceMax) || 0,
      deadline: formData.deadline || null,
      description: formData.description,
      requirements: formData.requirements,
      // backend expects array of strings; you currently use textarea
      benefits: formData.benefits
        ? formData.benefits.split(",").map((b) => b.trim())
        : [],
      // companyLogo: leave empty for now or send URL when you add upload
    });

    navigate("/admin");
  } catch (err) {
    console.log(err);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "60px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            width: "100%",
            background: "white",
            borderRadius: "30px",
            padding: "50px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            animation: "slideUp 0.6s ease-out"
          }}
        >
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "70px",
                height: "70px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                marginBottom: "20px",
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
              }}
            >
              <BsBriefcase size={35} color="white" />
            </div>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "800",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "10px"
              }}
            >
              Add New Job
            </h1>
            <p style={{ color: "#6c757d", fontSize: "15px" }}>
              Required fields marked with <span style={{ color: "#ef4444" }}>*</span>
            </p>
          </div>

          {/* Two Column Layout */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "25px",
              marginBottom: "25px"
            }}
          >
            {/* Company Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#495057",
                  marginBottom: "8px"
                }}
              >
                Company Name <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <BsBriefcase
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#667eea",
                    fontSize: "18px"
                  }}
                />
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="e.g. Enter company name"
                  required
                  style={{
                    width: "80%",
                    padding: "14px 14px 14px 45px",
                    border: "2px solid #e9ecef",
                    borderRadius: "12px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                />
              </div>
            </div>

            {/* Job Title */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#495057",
                  marginBottom: "8px"
                }}
              >
                Job Title <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <BsBriefcase
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#667eea",
                    fontSize: "18px"
                  }}
                />
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Senior React Developer"
                  required
                  style={{
                    width: "80%",
                    padding: "14px 14px 14px 45px",
                    border: "2px solid #e9ecef",
                    borderRadius: "12px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                />
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#495057",
                  marginBottom: "8px"
                }}
              >
                Job Type <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                required
                style={{
                  width: "95%",
                  padding: "14px",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  outline: "none",
                  cursor: "pointer",
                  background: "white"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              >
                <option value="">Select Type</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#495057",
                  marginBottom: "8px"
                }}
              >
                Location <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <div style={{ position: "relative" }}>
                <BsGeoAlt
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#667eea",
                    fontSize: "18px"
                  }}
                />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bangalore, Karnataka"
                  required
                  style={{
                    width: "80%",
                    padding: "14px 14px 14px 45px",
                    border: "2px solid #e9ecef",
                    borderRadius: "12px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                />
              </div>
            </div>

            {/* Work Mode */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#495057",
                  marginBottom: "8px"
                }}
              >
                Work Mode <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <select
                name="workMode"
                value={formData.workMode}
                onChange={handleChange}
                required
                style={{
                  width: "95%",
                  padding: "14px",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  outline: "none",
                  cursor: "pointer",
                  background: "white"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              >
                <option value="">Select Mode</option>
                <option value="remote">Remote</option>
                <option value="onsite">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Salary Range */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#495057",
                marginBottom: "8px"
              }}
            >
              Salary Range (₹)
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <div style={{ position: "relative" }}>
                <BsCurrencyDollar
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#667eea",
                    fontSize: "18px"
                  }}
                />
                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="Min (₹)"
                  style={{
                    width: "80%",
                    padding: "14px 14px 14px 45px",
                    border: "2px solid #e9ecef",
                    borderRadius: "12px",
                    fontSize: "15px",
                    transition: "all 0.3s ease",
                    outline: "none"
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
                />
              </div>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleChange}
                placeholder="Max (₹)"
                style={{
                  width: "88%",
                  padding: "14px",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            </div>
          </div>

          {/* Experience Required */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#495057",
                marginBottom: "8px"
              }}
            >
              Experience Required (years)
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
              <input
                type="number"
                name="experienceMin"
                value={formData.experienceMin}
                onChange={handleChange}
                placeholder="Min (years)"
                style={{
                  width: "88%",
                  padding: "14px",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
              <input
                type="number"
                name="experienceMax"
                value={formData.experienceMax}
                onChange={handleChange}
                placeholder="Max (years)"
                style={{
                  width: "88%",
                  padding: "14px",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            </div>
          </div>

          {/* Application Deadline */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#495057",
                marginBottom: "8px"
              }}
            >
              Application Deadline <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <BsCalendar
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#667eea",
                  fontSize: "18px"
                }}
              />
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                style={{
                  width: "40%",
                  padding: "14px 14px 14px 45px",
                  border: "2px solid #e9ecef",
                  borderRadius: "12px",
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  outline: "none"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
              />
            </div>
          </div>

          {/* Job Description */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#495057",
                marginBottom: "8px"
              }}
            >
              Job Description <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed job description, responsibilities, daily tasks..."
              rows="4"
              required
              style={{
                width: "100%",
                padding: "14px",
                border: "2px solid #e9ecef",
                borderRadius: "12px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
            />
          </div>

          {/* Requirements */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#495057",
                marginBottom: "8px"
              }}
            >
              Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              placeholder="Must-have skills, qualifications, experience..."
              rows="4"
              style={{
                width: "100%",
                padding: "14px",
                border: "2px solid #e9ecef",
                borderRadius: "12px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
            />
          </div>

          {/* Benefits */}
          <div style={{ marginBottom: "25px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#495057",
                marginBottom: "8px"
              }}
            >
              Benefits
            </label>
            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="Health insurance, flexible hours, remote work, etc."
              rows="3"
              style={{
                width: "100%",
                padding: "14px",
                border: "2px solid #e9ecef",
                borderRadius: "12px",
                fontSize: "15px",
                transition: "all 0.3s ease",
                outline: "none",
                resize: "vertical",
                fontFamily: "inherit"
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) => (e.target.style.borderColor = "#e9ecef")}
            />
          </div>

          {/* Company Logo Upload */}
          <div style={{ marginBottom: "35px" }}>
            <label
              style={{
                display: "block",
                fontSize: "14px",
                fontWeight: "600",
                color: "#495057",
                marginBottom: "8px"
              }}
            >
              Company Logo
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${isDragging ? "#667eea" : "#e9ecef"}`,
                borderRadius: "12px",
                padding: "30px",
                textAlign: "center",
                background: isDragging ? "#667eea10" : "#f8f9fa",
                transition: "all 0.3s ease",
                cursor: "pointer"
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ display: "none" }}
                id="logo-upload"
              />
              <label htmlFor="logo-upload" style={{ cursor: "pointer" }}>
                {logoPreview ? (
                  <div>
                    <img
                      src={logoPreview}
                      alt="Company Logo"
                      style={{
                        maxWidth: "150px",
                        maxHeight: "150px",
                        borderRadius: "12px",
                        marginBottom: "15px"
                      }}
                    />
                    <p style={{ color: "#10b981", fontSize: "14px", fontWeight: "600" }}>
                      <BsCheckCircleFill style={{ marginRight: "5px" }} />
                      Logo uploaded successfully!
                    </p>
                  </div>
                ) : (
                  <div>
                    <BsUpload size={40} color="#667eea" style={{ marginBottom: "15px" }} />
                    <p
                      style={{
                        color: "#495057",
                        fontSize: "15px",
                        fontWeight: "600",
                        marginBottom: "5px"
                      }}
                    >
                      Upload company logo
                    </p>
                    <p style={{ color: "#6c757d", fontSize: "13px" }}>
                      Max file size: 4 MB (jpg, png)
                    </p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 35px rgba(102, 126, 234, 0.5)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
            }}
          >
            <BsCheckCircleFill size={20} />
            Post Job
          </button>

          <style>
            {`
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(30px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}
          </style>
        </div>
      </div>
    </form>
  );
};

export default AddJobForm;
