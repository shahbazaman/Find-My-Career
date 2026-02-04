import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsUpload, BsCheckCircleFill, BsBriefcase, BsGeoAlt, BsCurrencyDollar, BsCalendar } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const token = localStorage.getItem("token");

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

  if (!token) {
  toast.error("Session expired. Please login again.");
  navigate("/login");
  return;
}


  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/jobs`,
      {
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
        benefits: formData.benefits
          ? formData.benefits.split(",").map(b => b.trim())
          : []
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    );

    toast.success("Job posted successfully");
    navigate("/");

  } catch (error) {
    console.error("ADD JOB ERROR:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Failed to post job");
  }
};


  return (
    <Container fluid className="px-3 py-5 min-vh-100 d-flex align-items-center" style={{ 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
    }}>
      <ToastContainer position="top-center" />
      <Row className="justify-content-center w-100">
        <Col xs={12} lg={10} xl={8}>
          <Form onSubmit={handleSubmit}>
            <div style={{
              background: "white",
              borderRadius: "30px",
              padding: "clamp(30px, 5vw, 50px)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
              animation: "slideUp 0.6s ease-out"
            }}>
              {/* Header */}
              <div className="text-center mb-5">
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "clamp(60px, 12vw, 70px)",
                  height: "clamp(60px, 12vw, 70px)",
                  borderRadius: "20px",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  marginBottom: "20px",
                  boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)"
                }}>
                  <BsBriefcase style={{ fontSize: "clamp(28px, 5vw, 35px)" }} color="white" />
                </div>
                <h1 style={{
                  fontSize: "clamp(28px, 6vw, 36px)",
                  fontWeight: "800",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  marginBottom: "10px"
                }}>
                  Add New Job
                </h1>
                <p style={{ 
                  color: "#6c757d", 
                  fontSize: "clamp(13px, 2.5vw, 15px)" 
                }}>
                  Required fields marked with <span style={{ color: "#ef4444" }}>*</span>
                </p>
              </div>

              <Row className="g-4 mb-4">
                {/* Company Name & Job Title */}
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Company Name <span style={{ color: "#ef4444" }}>*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <BsBriefcase 
                        className="position-absolute top-50 start-0 translate-middle-y ms-3" 
                        style={{ color: "#667eea", fontSize: "18px", zIndex: 3 }}
                      />
                      <Form.Control
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Enter company name"
                        required
                        className="ps-5"
                        style={{
                          border: "2px solid #e9ecef",
                          borderRadius: "12px",
                          fontSize: "clamp(14px, 2.8vw, 15px)",
                          transition: "all 0.3s ease"
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Job Title <span style={{ color: "#ef4444" }}>*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <BsBriefcase 
                        className="position-absolute top-50 start-0 translate-middle-y ms-3" 
                        style={{ color: "#667eea", fontSize: "18px", zIndex: 3 }}
                      />
                      <Form.Control
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="e.g. Senior React Developer"
                        required
                        className="ps-5"
                        style={{
                          border: "2px solid #e9ecef",
                          borderRadius: "12px",
                          fontSize: "clamp(14px, 2.8vw, 15px)",
                          transition: "all 0.3s ease"
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>

                {/* Job Type & Location */}
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Job Type <span style={{ color: "#ef4444" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleChange}
                      required
                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "12px",
                        fontSize: "clamp(14px, 2.8vw, 15px)"
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="internship">Internship</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Location <span style={{ color: "#ef4444" }}>*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <BsGeoAlt 
                        className="position-absolute top-50 start-0 translate-middle-y ms-3" 
                        style={{ color: "#667eea", fontSize: "18px", zIndex: 3 }}
                      />
                      <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Bangalore, Karnataka"
                        required
                        className="ps-5"
                        style={{
                          border: "2px solid #e9ecef",
                          borderRadius: "12px",
                          fontSize: "clamp(14px, 2.8vw, 15px)"
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>

                {/* Work Mode & Deadline */}
                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Work Mode <span style={{ color: "#ef4444" }}>*</span>
                    </Form.Label>
                    <Form.Select
                      name="workMode"
                      value={formData.workMode}
                      onChange={handleChange}
                      required
                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "12px",
                        fontSize: "clamp(14px, 2.8vw, 15px)"
                      }}
                    >
                      <option value="">Select Mode</option>
                      <option value="remote">Remote</option>
                      <option value="onsite">On-site</option>
                      <option value="hybrid">Hybrid</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Application Deadline <span style={{ color: "#ef4444" }}>*</span>
                    </Form.Label>
                    <div className="position-relative">
                      <BsCalendar 
                        className="position-absolute top-50 start-0 translate-middle-y ms-3" 
                        style={{ color: "#667eea", fontSize: "18px", zIndex: 3 }}
                      />
                      <Form.Control
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        required
                        className="ps-5"
                        style={{
                          border: "2px solid #e9ecef",
                          borderRadius: "12px",
                          fontSize: "clamp(14px, 2.8vw, 15px)"
                        }}
                      />
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              {/* Salary Range */}
              <Row className="g-4 mb-4">
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">Salary Range (₹)</Form.Label>
                    <Row>
                      <Col md={6}>
                        <div className="position-relative">
                          <BsCurrencyDollar 
                            className="position-absolute top-50 start-0 translate-middle-y ms-3" 
                            style={{ color: "#667eea", fontSize: "18px", zIndex: 3 }}
                          />
                          <Form.Control
                            type="number"
                            name="salaryMin"
                            value={formData.salaryMin}
                            onChange={handleChange}
                            placeholder="Min (₹)"
                            className="ps-5"
                            style={{
                              border: "2px solid #e9ecef",
                              borderRadius: "12px",
                              fontSize: "clamp(14px, 2.8vw, 15px)"
                            }}
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          type="number"
                          name="salaryMax"
                          value={formData.salaryMax}
                          onChange={handleChange}
                          placeholder="Max (₹)"
                          style={{
                            border: "2px solid #e9ecef",
                            borderRadius: "12px",
                            fontSize: "clamp(14px, 2.8vw, 15px)"
                          }}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>

              {/* Experience Range */}
              <Row className="g-4 mb-4">
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">Experience Required (years)</Form.Label>
                    <Row>
                      <Col md={6}>
                        <Form.Control
                          type="number"
                          name="experienceMin"
                          value={formData.experienceMin}
                          onChange={handleChange}
                          placeholder="Min (years)"
                          style={{
                            border: "2px solid #e9ecef",
                            borderRadius: "12px",
                            fontSize: "clamp(14px, 2.8vw, 15px)"
                          }}
                        />
                      </Col>
                      <Col md={6}>
                        <Form.Control
                          type="number"
                          name="experienceMax"
                          value={formData.experienceMax}
                          onChange={handleChange}
                          placeholder="Max (years)"
                          style={{
                            border: "2px solid #e9ecef",
                            borderRadius: "12px",
                            fontSize: "clamp(14px, 2.8vw, 15px)"
                          }}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
              </Row>

              {/* Textareas */}
              <Row className="g-4 mb-4">
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">
                      Job Description <span style={{ color: "#ef4444" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Detailed job description, responsibilities, daily tasks..."
                      rows={4}
                      required
                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "12px",
                        fontSize: "clamp(14px, 2.8vw, 15px)",
                        resize: "vertical"
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">Requirements</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      placeholder="Must-have skills, qualifications, experience..."
                      rows={3}
                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "12px",
                        fontSize: "clamp(14px, 2.8vw, 15px)",
                        resize: "vertical"
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-2">Benefits</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleChange}
                      placeholder="Health insurance, flexible hours, remote work, etc."
                      rows={3}
                      style={{
                        border: "2px solid #e9ecef",
                        borderRadius: "12px",
                        fontSize: "clamp(14px, 2.8vw, 15px)",
                        resize: "vertical"
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Company Logo Upload */}
              <Row className="g-4 mb-5">
                <Col xs={12}>
                  <Form.Group>
                    <Form.Label className="fw-semibold text-muted mb-3">Company Logo</Form.Label>
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      style={{
                        border: `2px dashed ${isDragging ? "#667eea" : "#e9ecef"}`,
                        borderRadius: "12px",
                        padding: "clamp(25px, 6vw, 30px)",
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
                                maxWidth: "clamp(120px, 25vw, 150px)",
                                maxHeight: "clamp(120px, 25vw, 150px)",
                                borderRadius: "12px",
                                marginBottom: "15px"
                              }}
                            />
                            <p style={{ 
                              color: "#10b981", 
                              fontSize: "clamp(13px, 2.5vw, 14px)", 
                              fontWeight: "600" 
                            }}>
                              <BsCheckCircleFill style={{ marginRight: "5px" }} />
                              Logo uploaded successfully!
                            </p>
                          </div>
                        ) : (
                          <div>
                            <BsUpload 
                              color="#667eea" 
                              style={{ 
                                fontSize: "clamp(32px, 6vw, 40px)", 
                                marginBottom: "15px" 
                              }} 
                            />
                            <p style={{
                              color: "#495057",
                              fontSize: "clamp(14px, 2.8vw, 15px)",
                              fontWeight: "600",
                              marginBottom: "5px"
                            }}>
                              Upload company logo
                            </p>
                            <p style={{ 
                              color: "#6c757d", 
                              fontSize: "clamp(12px, 2.2vw, 13px)" 
                            }}>
                              Max file size: 4 MB (jpg, png)
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                  </Form.Group>
                </Col>
              </Row>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-100 p-3"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "clamp(15px, 3vw, 16px)",
                  fontWeight: "700",
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
              </Button>

              <style>{`
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
                
                .form-control:focus,
                .form-select:focus {
                  border-color: #667eea !important;
                  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
                }
              `}</style>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddJobForm;
