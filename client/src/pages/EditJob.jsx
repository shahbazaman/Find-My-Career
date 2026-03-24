import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  BsUpload,
  BsCheckCircleFill,
  BsBriefcase,
  BsGeoAlt,
  BsCurrencyDollar,
} from "react-icons/bs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

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
    benefits: ""
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  /* ================= FETCH JOB DETAILS ================= */
  useEffect(() => {
    if (!token || !jobId) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const job = res.data;

        setFormData({
          companyName: job.companyName || "",
          jobTitle: job.jobTitle || "",
          jobType: job.jobType || "",
          location: job.location || "",
          workMode: job.workMode || "",
          salaryMin: job.salaryMin || "",
          salaryMax: job.salaryMax || "",
          experienceMin: job.experienceMin || "",
          experienceMax: job.experienceMax || "",
          deadline: job.deadline ? job.deadline.slice(0, 10) : "",
          description: job.description || "",
          requirements: job.requirements || "",
          benefits: Array.isArray(job.benefits) ? job.benefits.join(", ") : ""
        });

        setLoading(false);
      } catch (err) {
        toast.error("Failed to load job");
navigate("/recruiter");
      }
    };

    fetchJob();
  }, [jobId, token, navigate]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`,
        {
          ...formData,
          salaryMin: Number(formData.salaryMin) || 0,
          salaryMax: Number(formData.salaryMax) || 0,
          experienceMin: Number(formData.experienceMin) || 0,
          experienceMax: Number(formData.experienceMax) || 0,
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

      toast.success("Job updated successfully");
navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job");
    }
  };

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center" }}>Loading job...</p>;
  }

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
        <Col xs={12} md={10} lg={8} xl={7} className="mx-auto">
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                background: "white",
                borderRadius: "30px",
                padding: "40px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.3)"
              }}
            >
              <div className="text-center mb-5">
                <h1
                  style={{
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg,#667eea,#764ba2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Edit Job
                </h1>
              </div>

              {/* ================= FORM FIELDS ================= */}

              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Form.Control
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Control
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title"
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </Form.Select>
                </Col>

                <Col md={6}>
                  <Form.Control
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Work Mode</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                  </Form.Select>
                </Col>

                <Col md={6}>
                  <CustomDatePicker
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                  />
                </Col>
              </Row>

              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="Salary Min"
                  />
                </Col>

                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="Salary Max"
                  />
                </Col>
              </Row>

              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="experienceMin"
                    value={formData.experienceMin}
                    onChange={handleChange}
                    placeholder="Experience Min"
                  />
                </Col>

                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="experienceMax"
                    value={formData.experienceMax}
                    onChange={handleChange}
                    placeholder="Experience Max"
                  />
                </Col>
              </Row>

              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Job Description"
                required
                className="mb-3"
              />

              <Form.Control
                as="textarea"
                rows={3}
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Requirements"
                className="mb-3"
              />

              <Form.Control
                as="textarea"
                rows={3}
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Benefits (comma separated)"
                className="mb-4"
              />

              {/* ================= SUBMIT ================= */}
              <Button
                type="submit"
                className="w-100 p-3"
                style={{
                  background:
                    "linear-gradient(135deg,#667eea,#764ba2)",
                  border: "none",
                  fontWeight: 700
                }}
              >
                <BsCheckCircleFill size={20} /> Update Job
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditJob;
