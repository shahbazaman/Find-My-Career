import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { BsUpload, BsCheckCircleFill, BsBriefcase, BsGeoAlt, BsCurrencyDollar } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
/* ================= CUSTOM DATE PICKER ================= */
const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

const navBtn = {
  background: "none", border: "none", cursor: "pointer",
  fontSize: "20px", color: "#555", padding: "0 6px", lineHeight: 1
};

function CustomDatePicker({ value, onChange, name }) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [mode, setMode] = useState("day");
  const ref = useRef(null);

  const selected = value ? new Date(value + "T00:00:00") : null;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setMode("day"); } };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (selected) { setViewYear(selected.getFullYear()); setViewMonth(selected.getMonth()); }
  }, [value]);

  const fire = (y, m, d) => {
    onChange({ target: { name, value: `${y}-${String(m+1).padStart(2,"0")}-${String(d).padStart(2,"0")}` } });
    setOpen(false); setMode("day");
  };

  const daysInMonth = (m, y) => new Date(y, m + 1, 0).getDate();
  const firstDay    = new Date(viewYear, viewMonth, 1).getDay();
  const totalDays   = daysInMonth(viewMonth, viewYear);
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const isSelected = (d) => selected && selected.getFullYear()===viewYear && selected.getMonth()===viewMonth && selected.getDate()===d;
  const isToday    = (d) => { const t=new Date(); return t.getFullYear()===viewYear && t.getMonth()===viewMonth && t.getDate()===d; };
  const displayValue = selected ? `${selected.getDate()} ${MONTHS[selected.getMonth()]} ${selected.getFullYear()}` : "";
  const startYear = Math.floor(viewYear / 12) * 12;
  const yearGrid  = Array.from({ length: 12 }, (_, i) => startYear + i);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", width: "100%" }}>
      <div onClick={() => { setOpen(o => !o); setMode("day"); }}
        style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"10px 14px", border:"2px solid #e9ecef", borderRadius:"12px",
          background:"white", cursor:"pointer", fontSize:"15px",
          color: displayValue ? "#333" : "#aaa", userSelect:"none",
          transition:"border-color 0.3s ease" }}
        onMouseEnter={e => e.currentTarget.style.borderColor="#667eea"}
        onMouseLeave={e => e.currentTarget.style.borderColor= open ? "#667eea" : "#e9ecef"}
      >
        <span>{displayValue || "Select deadline date"}</span>
        <span style={{ fontSize:"16px" }}>📅</span>
      </div>

      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, zIndex:9999,
          background:"white", border:"1px solid #e0e0e0", borderRadius:"12px",
          boxShadow:"0 8px 24px rgba(0,0,0,0.12)", padding:"16px", width:"280px" }}>

          {/* Header */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
            <button onClick={() => {
              if (mode==="day")   { viewMonth===0 ? (setViewMonth(11),setViewYear(y=>y-1)) : setViewMonth(m=>m-1); }
              if (mode==="month") setViewYear(y=>y-1);
              if (mode==="year")  setViewYear(y=>y-12);
            }} style={navBtn}>‹</button>

            <div style={{ display:"flex", gap:"6px" }}>
              <span onClick={() => setMode(m => m==="month" ? "day" : "month")}
                style={{ fontWeight:600, fontSize:"14px", color:"#667eea", cursor:"pointer",
                  padding:"2px 8px", borderRadius:"6px", background: mode==="month" ? "#ede9fe" : "transparent" }}>
                {MONTHS[viewMonth]}
              </span>
              <span onClick={() => setMode(m => m==="year" ? "day" : "year")}
                style={{ fontWeight:600, fontSize:"14px", color:"#667eea", cursor:"pointer",
                  padding:"2px 8px", borderRadius:"6px", background: mode==="year" ? "#ede9fe" : "transparent" }}>
                {mode==="year" ? `${startYear}–${startYear+11}` : viewYear}
              </span>
            </div>

            <button onClick={() => {
              if (mode==="day")   { viewMonth===11 ? (setViewMonth(0),setViewYear(y=>y+1)) : setViewMonth(m=>m+1); }
              if (mode==="month") setViewYear(y=>y+1);
              if (mode==="year")  setViewYear(y=>y+12);
            }} style={navBtn}>›</button>
          </div>

          {/* Month Picker */}
          {mode==="month" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"6px" }}>
              {MONTHS.map((m, i) => (
                <div key={m} onClick={() => { setViewMonth(i); setMode("day"); }}
                  style={{ textAlign:"center", padding:"8px 4px", borderRadius:"8px", cursor:"pointer", fontSize:"13px",
                    fontWeight: i===viewMonth ? 700 : 400,
                    background: i===viewMonth ? "#667eea" : "#f8f9fa",
                    color: i===viewMonth ? "white" : "#333" }}
                  onMouseEnter={e=>{ if(i!==viewMonth) e.currentTarget.style.background="#eef2ff"; }}
                  onMouseLeave={e=>{ if(i!==viewMonth) e.currentTarget.style.background="#f8f9fa"; }}>
                  {m}
                </div>
              ))}
            </div>
          )}

          {/* Year Picker */}
          {mode==="year" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"6px" }}>
              {yearGrid.map(y => (
                <div key={y} onClick={() => { setViewYear(y); setMode("month"); }}
                  style={{ textAlign:"center", padding:"8px 4px", borderRadius:"8px", cursor:"pointer", fontSize:"13px",
                    fontWeight: y===viewYear ? 700 : 400,
                    background: y===viewYear ? "#667eea" : "#f8f9fa",
                    color: y===viewYear ? "white" : "#333" }}
                  onMouseEnter={e=>{ if(y!==viewYear) e.currentTarget.style.background="#eef2ff"; }}
                  onMouseLeave={e=>{ if(y!==viewYear) e.currentTarget.style.background="#f8f9fa"; }}>
                  {y}
                </div>
              ))}
            </div>
          )}

          {/* Day Grid */}
          {mode==="day" && (<>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:"6px" }}>
              {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                <div key={d} style={{ textAlign:"center", fontSize:"11px", fontWeight:600, color:"#999", padding:"4px 0" }}>{d}</div>
              ))}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px" }}>
              {cells.map((d, i) => (
                <div key={i} onClick={() => d && fire(viewYear, viewMonth, d)}
                  style={{ textAlign:"center", padding:"7px 0", fontSize:"13px", borderRadius:"50%",
                    cursor: d ? "pointer" : "default",
                    background: d && isSelected(d) ? "#667eea" : "transparent",
                    color: d && isSelected(d) ? "white" : d && isToday(d) ? "#667eea" : d ? "#333" : "transparent",
                    fontWeight: d && (isSelected(d)||isToday(d)) ? 700 : 400,
                    border: d && isToday(d) && !isSelected(d) ? "1px solid #667eea" : "1px solid transparent",
                    transition:"background 0.15s" }}
                  onMouseEnter={e=>{ if(d&&!isSelected(d)) e.currentTarget.style.background="#f0f0f0"; }}
                  onMouseLeave={e=>{ if(d&&!isSelected(d)) e.currentTarget.style.background="transparent"; }}>
                  {d||""}
                </div>
              ))}
            </div>
          </>)}

          {selected && (
            <div onClick={() => { onChange({ target:{name,value:""} }); setOpen(false); setMode("day"); }}
              style={{ marginTop:"10px", textAlign:"center", fontSize:"12px", color:"#999", cursor:"pointer" }}>
              ✕ Clear
            </div>
          )}
        </div>
      )}
    </div>
  );
}
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
    <Container
  fluid
  className="px-3 py-5 min-vh-100 d-flex align-items-center justify-content-center"
  style={{
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    minHeight: "100vh",
    width: "100vw",
    marginLeft: "calc(-50vw + 50%)",
    paddingTop: "2rem",
    paddingBottom: "2rem",
  }}
>
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
    <CustomDatePicker
      name="deadline"
      value={formData.deadline}
      onChange={handleChange}
    />
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
                            onWheel={(e) => e.target.blur()}   // ← add this
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
                          onWheel={(e) => e.target.blur()}   // ← add this
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
                      onWheel={(e) => e.target.blur()}   // ← add this
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
                          onWheel={(e) => e.target.blur()}   // ← add this
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
                  
                input[type="number"]::-webkit-inner-spin-button,
                input[type="number"]::-webkit-outer-spin-button {
                  -webkit-appearance: none;
                  margin: 0;
                }
                input[type="number"] {
                  -moz-appearance: textfield;
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
