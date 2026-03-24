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
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function CustomDatePicker({ value, onChange, name }) {
  // value is "YYYY-MM-DD" or ""
  const parsed = value ? value.split("-") : ["", "", ""];
  const [year,  setYear]  = useState(parsed[0] || "");
  const [month, setMonth] = useState(parsed[1] ? parseInt(parsed[1], 10) : "");
  const [day,   setDay]   = useState(parsed[2] ? parseInt(parsed[2], 10) : "");

  // Sync internal state when value prop changes externally (e.g. on profile load)
  useEffect(() => {
    if (value) {
      const parts = value.split("-");
      setYear(parts[0] || "");
      setMonth(parts[1] ? parseInt(parts[1], 10) : "");
      setDay(parts[2]   ? parseInt(parts[2], 10) : "");
    } else {
      setYear(""); setMonth(""); setDay("");
    }
  }, [value]);

  const daysInMonth = (m, y) => {
    if (!m || !y) return 31;
    return new Date(y, m, 0).getDate();
  };

  const maxDay    = daysInMonth(month, year);
  const dayOptions = Array.from({ length: maxDay }, (_, i) => i + 1);

  // Year options: 1940 → current year
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
  { length: 30 },
  (_, i) => currentYear - i
);

  const fireChange = (y, m, d) => {
    if (y && m && d) {
      const mm = String(m).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      onChange({ target: { name, value: `${y}-${mm}-${dd}` } });
    } else {
      onChange({ target: { name, value: "" } });
    }
  };

  const handleYear = (e) => {
    const y = e.target.value;
    setYear(y);
    fireChange(y, month, day);
  };

  const handleMonth = (e) => {
    const m = e.target.value ? parseInt(e.target.value, 10) : "";
    setMonth(m);
    const maxD      = daysInMonth(m, year);
    const clampedDay = day > maxD ? maxD : day;
    if (day > maxD) setDay(maxD);
    fireChange(year, m, clampedDay);
  };

  const handleDay = (e) => {
    const d = e.target.value ? parseInt(e.target.value, 10) : "";
    setDay(d);
    fireChange(year, month, d);
  };

  const selectStyle = {
    padding: "7px 10px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "14px",
    background: "white",
    cursor: "pointer",
    outline: "none",
    color: "#333",
    flex: 1,
    minWidth: 0,
    appearance: "auto"
  };

  const inputStyle = {
    padding: "7px 10px",
    border: "1px solid #ced4da",
    borderRadius: "6px",
    fontSize: "14px",
    background: "white",
    color: "#333",
    outline: "none"
  };

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>

      {/* Month — dropdown (only 12 items, fine as-is) */}
      <select
        value={month}
        onChange={handleMonth}
        style={{ ...inputStyle, flex: 1, minWidth: "110px", cursor: "pointer" }}
      >
        <option value="">Month</option>
        {MONTHS.map((m, i) => (
          <option key={m} value={i + 1}>{m}</option>
        ))}
      </select>

      {/* Day — number input instead of 31-item dropdown */}
      <input
        type="number"
        min="1"
        max={maxDay}
        placeholder="DD"
        value={day}
        onChange={(e) => {
          const d = e.target.value ? parseInt(e.target.value, 10) : "";
          if (d === "" || (d >= 1 && d <= maxDay)) {
            setDay(d);
            fireChange(year, month, d);
          }
        }}
        style={{ ...inputStyle, width: "70px", textAlign: "center" }}
      />

      {/* Year — number input instead of 85-item dropdown */}
      <input
        type="number"
        min="1940"
        max={new Date().getFullYear()}
        placeholder="YYYY"
        value={year}
        onChange={(e) => {
          const y = e.target.value;
          setYear(y);
          if (y.length === 4) fireChange(y, month, day);
        }}
        style={{ ...inputStyle, width: "90px", textAlign: "center" }}
      />

    </div>
  );
}

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