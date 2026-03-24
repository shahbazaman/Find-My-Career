import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Tabs,
  Tab,
  Container,
  ProgressBar,
  Card,
  Row,
  Col
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import {
  FaUser,
  FaCamera,
  FaFileUpload,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIdCard,
  FaGlobe,
  FaSave,
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

/* ================= CONFIG ================= */
const cloudName = "dcfdc10zg";
const IMAGE_UPLOAD_PRESET = "findMyCareer";
const RESUME_UPLOAD_PRESET = "resumeRaw";

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

/* ================= CUSTOM DATE PICKER ================= */
const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

function CustomDatePicker({ value, onChange, name }) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [mode, setMode] = useState("day"); // "day" | "month" | "year"
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

  // Year grid: show 12 years centered around viewYear
  const startYear = Math.floor(viewYear / 12) * 12;
  const yearGrid  = Array.from({ length: 12 }, (_, i) => startYear + i);

  return (
    <div ref={ref} style={{ position: "relative", display: "inline-block", width: "100%" }}>
      {/* Trigger */}
      <div onClick={() => { setOpen(o => !o); setMode("day"); }}
        style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"8px 12px", border:"1px solid #ced4da", borderRadius:"8px",
          background:"white", cursor:"pointer", fontSize:"14px",
          color: displayValue ? "#333" : "#aaa", userSelect:"none" }}>
        <span>{displayValue || "Select date"}</span>
        <span style={{ fontSize:"16px" }}>📅</span>
      </div>

      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, zIndex:9999,
          background:"white", border:"1px solid #e0e0e0", borderRadius:"12px",
          boxShadow:"0 8px 24px rgba(0,0,0,0.12)", padding:"16px", width:"280px" }}>

          {/* ── Header ── */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
            {/* Prev */}
            <button onClick={() => {
              if (mode==="day")  { viewMonth===0 ? (setViewMonth(11),setViewYear(y=>y-1)) : setViewMonth(m=>m-1); }
              if (mode==="month") setViewYear(y=>y-1);
              if (mode==="year")  setViewYear(y=>y-12);
            }} style={navBtn}>‹</button>

            {/* Title — clickable to switch mode */}
            <div style={{ display:"flex", gap:"6px" }}>
              <span onClick={() => setMode(m => m==="month" ? "day" : "month")}
                style={{ fontWeight:600, fontSize:"14px", color:"#4f46e5", cursor:"pointer",
                  padding:"2px 8px", borderRadius:"6px", background: mode==="month"?"#eef2ff":"transparent" }}>
                {MONTHS[viewMonth]}
              </span>
              <span onClick={() => setMode(m => m==="year" ? "day" : "year")}
                style={{ fontWeight:600, fontSize:"14px", color:"#4f46e5", cursor:"pointer",
                  padding:"2px 8px", borderRadius:"6px", background: mode==="year"?"#eef2ff":"transparent" }}>
                {mode==="year" ? `${startYear}–${startYear+11}` : viewYear}
              </span>
            </div>

            {/* Next */}
            <button onClick={() => {
              if (mode==="day")  { viewMonth===11 ? (setViewMonth(0),setViewYear(y=>y+1)) : setViewMonth(m=>m+1); }
              if (mode==="month") setViewYear(y=>y+1);
              if (mode==="year")  setViewYear(y=>y+12);
            }} style={navBtn}>›</button>
          </div>

          {/* ── MONTH PICKER ── */}
          {mode==="month" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"6px" }}>
              {MONTHS.map((m, i) => (
                <div key={m} onClick={() => { setViewMonth(i); setMode("day"); }}
                  style={{ textAlign:"center", padding:"8px 4px", borderRadius:"8px", cursor:"pointer", fontSize:"13px",
                    fontWeight: i===viewMonth ? 700 : 400,
                    background: i===viewMonth ? "#4f46e5" : "#f8f9fa",
                    color: i===viewMonth ? "white" : "#333" }}
                  onMouseEnter={e=>{ if(i!==viewMonth) e.currentTarget.style.background="#eef2ff"; }}
                  onMouseLeave={e=>{ if(i!==viewMonth) e.currentTarget.style.background="#f8f9fa"; }}>
                  {m}
                </div>
              ))}
            </div>
          )}

          {/* ── YEAR PICKER ── */}
          {mode==="year" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"6px" }}>
              {yearGrid.map(y => (
                <div key={y} onClick={() => { setViewYear(y); setMode("month"); }}
                  style={{ textAlign:"center", padding:"8px 4px", borderRadius:"8px", cursor:"pointer", fontSize:"13px",
                    fontWeight: y===viewYear ? 700 : 400,
                    background: y===viewYear ? "#4f46e5" : "#f8f9fa",
                    color: y===viewYear ? "white" : "#333" }}
                  onMouseEnter={e=>{ if(y!==viewYear) e.currentTarget.style.background="#eef2ff"; }}
                  onMouseLeave={e=>{ if(y!==viewYear) e.currentTarget.style.background="#f8f9fa"; }}>
                  {y}
                </div>
              ))}
            </div>
          )}

          {/* ── DAY GRID ── */}
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
                    background: d && isSelected(d) ? "#4f46e5" : "transparent",
                    color: d && isSelected(d) ? "white" : d && isToday(d) ? "#4f46e5" : d ? "#333" : "transparent",
                    fontWeight: d && (isSelected(d)||isToday(d)) ? 700 : 400,
                    border: d && isToday(d) && !isSelected(d) ? "1px solid #4f46e5" : "1px solid transparent",
                    transition:"background 0.15s" }}
                  onMouseEnter={e=>{ if(d&&!isSelected(d)) e.currentTarget.style.background="#f0f0f0"; }}
                  onMouseLeave={e=>{ if(d&&!isSelected(d)) e.currentTarget.style.background="transparent"; }}>
                  {d||""}
                </div>
              ))}
            </div>
          </>)}

          {/* Clear */}
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

const navBtn = {
  background: "none", border: "none", cursor: "pointer",
  fontSize: "20px", color: "#555", padding: "0 6px", lineHeight: 1
};

/* ================= FIELD CONFIG ================= */
const fieldConfig = {
  personal: [
    { name: "name",        label: "Full Name",      icon: <FaUser />,         type: "text"  },
    { name: "dob",         label: "Date of Birth",  icon: <FaCalendarAlt />,  type: "date"  },
    { name: "nationality", label: "Nationality",    icon: <FaGlobe />,        type: "text"  },
    { name: "idType",      label: "ID Type",        icon: <FaIdCard />,       type: "text"  },
    { name: "mobile",      label: "Mobile Number",  icon: <FaPhone />,        type: "tel"   },
    { name: "email",       label: "Email Address",  icon: <FaEnvelope />,     type: "email" },
    { name: "address",     label: "Address",        icon: <FaMapMarkerAlt />, type: "text"  },
    { name: "location",    label: "Location",       icon: <FaMapMarkerAlt />, type: "text"  }
  ],
  experience: [
    { name: "position",         label: "Position",         type: "text"     },
    { name: "company",          label: "Company",          type: "text"     },
    { name: "startDate",        label: "Start Date",       type: "date"     },
    { name: "endDate",          label: "End Date",         type: "date"     },
    { name: "responsibilities", label: "Responsibilities", type: "textarea" }
  ],
  education: [
    { name: "degree",     label: "Degree",     type: "text"     },
    { name: "institute",  label: "Institute",  type: "text"     },
    { name: "startYear",  label: "Start Year", type: "text"     },
    { name: "endYear",    label: "End Year",   type: "text"     },
    { name: "cgpa",       label: "CGPA",       type: "text"     },
    { name: "highlights", label: "Highlights", type: "textarea" }
  ],
  skills: [
    { name: "primarySkills", label: "Primary Skills"       },
    { name: "summary",       label: "Professional Summary" }
  ]
};

/* ================= MAIN COMPONENT ================= */
export default function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const userId     = storedUser?.id;
  const navigate   = useNavigate();

  const [loading,    setLoading]    = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [activeTab,  setActiveTab]  = useState("personal");

  /* ---- STATE ---- */
  const [profile, setProfile] = useState({
    name:        `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim(),
    email:       storedUser.email || "",
    dob:         "",
    nationality: "",
    idType:      "",
    mobile:      "",
    address:     "",
    location:    "",
    resumeUrl:   "",
    photoUrl:    "",
    experience: [{
      position: "", company: "", startDate: "", endDate: "", responsibilities: ""
    }],
    education: [{
      degree: "", institute: "", startYear: "", endYear: "", cgpa: "", highlights: ""
    }],
    skills: { primarySkills: "", summary: "" },
    userId
  });

  /* ---- LOAD PROFILE ---- */
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`
        );
        if (res.data && res.data.userId) {
          setProfile({
            ...res.data,
            name:  res.data.name  || `${storedUser.firstName || ""} ${storedUser.lastName || ""}`.trim(),
            email: res.data.email || storedUser.email || "",
            dob:   formatDate(res.data.dob),
            experience: res.data.experience?.length
              ? res.data.experience.map((e) => ({
                  ...e,
                  startDate: formatDate(e.startDate),
                  endDate:   formatDate(e.endDate)
                }))
              : [{ position: "", company: "", startDate: "", endDate: "", responsibilities: "" }],
            education: res.data.education?.length
              ? res.data.education
              : [{ degree: "", institute: "", startYear: "", endYear: "", cgpa: "", highlights: "" }],
            skills: res.data.skills || { primarySkills: "", summary: "" }
          });
        }
      } catch (err) {
        console.error("Load Profile Error:", err);
      }
    };
    if (userId) loadProfile();
  }, [userId]);

  /* ---- HANDLERS ---- */
  const handleChange = (e) =>
    setProfile({ ...profile, [e.target.name]: e.target.value });

  const handleNestedChange = (e, section) => {
    const updated = [...profile[section]];
    updated[0][e.target.name] = e.target.value;
    setProfile({ ...profile, [section]: updated });
  };

  /* ---- CLOUDINARY ---- */
  const uploadToCloudinary = async (file, type) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", type === "resume" ? RESUME_UPLOAD_PRESET : IMAGE_UPLOAD_PRESET);
    const endpoint = type === "resume"
      ? `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`
      : `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    try {
      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setProfile((prev) => ({
        ...prev,
        [type === "photo" ? "photoUrl" : "resumeUrl"]: res.data.secure_url
      }));
      toast.success(type === "photo" ? "Photo uploaded 📸" : "Resume uploaded 📄");
    } catch (err) {
      console.error("Cloudinary upload failed:", err?.response?.data || err);
      toast.error(err?.response?.data?.error?.message || "Cloudinary upload failed");
    }
  };

  /* ---- COMPLETION ---- */
  useEffect(() => {
    let filled = 0;
    const total = 23;
    const check = (v) => (v ? 1 : 0);
    filled += check(profile.name);
    filled += check(profile.dob);
    filled += check(profile.nationality);
    filled += check(profile.idType);
    filled += check(profile.mobile);
    filled += check(profile.email);
    filled += check(profile.address);
    filled += check(profile.location);
    filled += check(profile.resumeUrl);
    filled += check(profile.photoUrl);
    Object.values(profile.experience[0]).forEach((v) => (filled += check(v)));
    Object.values(profile.education[0]).forEach((v)  => (filled += check(v)));
    Object.values(profile.skills).forEach((v)        => (filled += check(v)));
    setPercentage(Math.floor((filled / total) * 100));
  }, [profile]);

  const getColor = () => {
    if (percentage < 40) return "danger";
    if (percentage < 80) return "warning";
    return "success";
  };

  /* ---- SAVE ---- */
  const handleSubmit = async () => {
    setLoading(true);
    if (!userId) { toast.error("User not logged in"); setLoading(false); return; }
    try {
      const payload = {
        ...profile,
        dob: profile.dob ? new Date(profile.dob) : null,
        experience: profile.experience
          .filter((e) => e.startDate)
          .map((e) => ({
            ...e,
            startDate: new Date(e.startDate),
            endDate:   e.endDate ? new Date(e.endDate) : null
          })),
        education: profile.education
          .filter((e) => e.startYear)
          .map((e) => ({
            ...e,
            startYear: Number(e.startYear),
            endYear:   e.endYear ? Number(e.endYear) : null
          })),
        userId
      };
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`, payload);
      toast.success("Profile saved successfully 🎉");
      navigate("/manage");
    } catch (err) {
      console.error(err);
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  /* ---- REUSABLE NAV BUTTONS ---- */
  const NavButtons = ({ prev, next, isLast }) => (
    <div className="d-flex justify-content-between mt-4">
      <div>
        {prev && (
          <Button variant="outline-secondary" onClick={() => setActiveTab(prev)}>
            ← Back
          </Button>
        )}
      </div>
      <div>
        {isLast ? (
          <Button variant="success" onClick={handleSubmit} disabled={loading}>
            <FaSave className="me-1" />
            {loading ? "Saving..." : "Save Profile"}
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setActiveTab(next)}>
            Next →
          </Button>
        )}
      </div>
    </div>
  );

  /* ---- RENDER PERSONAL FIELD (handles date vs text) ---- */
  const renderPersonalField = (f) => (
    <Col md={6} key={f.name} className="mb-3">
      <Form.Label>{f.label}</Form.Label>
      {f.type === "date" ? (
        <CustomDatePicker
          name={f.name}
          value={profile[f.name]}
          onChange={handleChange}
        />
      ) : (
        <Form.Control
          type={f.type}
          name={f.name}
          value={profile[f.name]}
          onChange={handleChange}
        />
      )}
    </Col>
  );

  /* ---- RENDER EXPERIENCE FIELD (handles date vs text/textarea) ---- */
  const renderExperienceField = (f) => (
    <Col md={6} key={f.name} className="mb-3">
      <Form.Label>{f.label}</Form.Label>
      {f.type === "date" ? (
        <CustomDatePicker
          name={f.name}
          value={profile.experience[0][f.name]}
          onChange={(e) => handleNestedChange(e, "experience")}
        />
      ) : (
        <Form.Control
          type={f.type}
          as={f.type === "textarea" ? "textarea" : "input"}
          rows={f.type === "textarea" ? 4 : undefined}
          name={f.name}
          value={profile.experience[0][f.name]}
          onChange={(e) => handleNestedChange(e, "experience")}
        />
      )}
    </Col>
  );

  /* ---- UI ---- */
  return (
    <div style={{ minHeight: "100vh", padding: "20px 0" }}>
      <Container style={{ maxWidth: "1000px" }}>
        <Card>
          <Card.Body>

            <ProgressBar
              animated
              now={percentage}
              variant={getColor()}
              label={`${percentage}%`}
              className="mb-4"
            />

            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4"
            >

              {/* ===== PERSONAL TAB ===== */}
              <Tab eventKey="personal" title="Personal">

                {/* Photo & Resume upload */}
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      {/* PHOTO */}
                      <Col md={6} className="mb-3 text-center">
                        <Form.Label><FaCamera /> Profile Photo</Form.Label>
                        {profile.photoUrl ? (
                          <img
                            src={profile.photoUrl}
                            alt="Profile"
                            style={{
                              width: "150px", height: "150px",
                              borderRadius: "50%", objectFit: "cover",
                              display: "block", margin: "10px auto"
                            }}
                          />
                        ) : (
                          <div style={{ fontSize: "80px", color: "#ccc" }}>
                            <FaUser />
                          </div>
                        )}
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            if (!file.type.startsWith("image/")) {
                              toast.error("Only image files are allowed"); return;
                            }
                            uploadToCloudinary(file, "photo");
                          }}
                        />
                      </Col>

                      {/* RESUME */}
                      <Col md={6} className="mb-3">
                        <Form.Label><FaFileUpload /> Resume</Form.Label>
                        <Form.Control
                          type="file"
                          accept="application/pdf"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            if (file.type !== "application/pdf") {
                              toast.error("Only PDF resumes are allowed"); return;
                            }
                            uploadToCloudinary(file, "resume");
                          }}
                        />
                        {profile.resumeUrl && (
                          <div className="mt-2 d-flex gap-2">
                            <Button variant="outline-primary" size="sm"
                              onClick={() => window.open(profile.resumeUrl, "_blank")}>
                              View PDF
                            </Button>
                            <Button variant="outline-success" size="sm"
                              onClick={() => {
                                const url = profile.resumeUrl.replace("/upload/", "/upload/fl_attachment/");
                                window.location.href = url;
                              }}>
                              Download
                            </Button>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>

                {/* Personal fields */}
                <Row>
                  {fieldConfig.personal.map(renderPersonalField)}
                </Row>

                <NavButtons next="experience" />
              </Tab>

              {/* ===== EXPERIENCE TAB ===== */}
              <Tab eventKey="experience" title="Experience">
                <Row>
                  {fieldConfig.experience.map(renderExperienceField)}
                </Row>
                <NavButtons prev="personal" next="education" />
              </Tab>

              {/* ===== EDUCATION TAB ===== */}
              <Tab eventKey="education" title="Education">
                <Row>
                  {fieldConfig.education.map((f) => (
                    <Col md={6} key={f.name} className="mb-3">
                      <Form.Label>{f.label}</Form.Label>
                      <Form.Control
                        type={f.type}
                        as={f.type === "textarea" ? "textarea" : "input"}
                        rows={f.type === "textarea" ? 4 : undefined}
                        name={f.name}
                        value={profile.education[0][f.name]}
                        onChange={(e) => handleNestedChange(e, "education")}
                      />
                    </Col>
                  ))}
                </Row>
                <NavButtons prev="experience" next="skills" />
              </Tab>

              {/* ===== SKILLS TAB ===== */}
              <Tab eventKey="skills" title="Skills">
                {fieldConfig.skills.map((f) => (
                  <Form.Group key={f.name} className="mb-3">
                    <Form.Label>{f.label}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name={f.name}
                      value={profile.skills[f.name]}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          skills: { ...profile.skills, [f.name]: e.target.value }
                        })
                      }
                    />
                  </Form.Group>
                ))}
                <NavButtons prev="education" isLast />
              </Tab>

            </Tabs>

          </Card.Body>
        </Card>
      </Container>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}