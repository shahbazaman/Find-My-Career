import React, { useState, useEffect } from "react";
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
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaCamera,
  FaFileUpload,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaIdCard,
  FaGlobe,
  FaSave,
  FaCheckCircle
} from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

/* ================= CONFIG ================= */
const cloudName = "dcfdc10zg";
const IMAGE_UPLOAD_PRESET = "findMyCareer";
const RESUME_UPLOAD_PRESET = "resumeRaw";
// 🔽 ADD THIS HELPER AT TOP (above component)
const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

/* ================= FIELD CONFIG (REQUIRED) ================= */
const fieldConfig = {
  personal: [
    { name: "name", label: "Full Name", icon: <FaUser />, type: "text" },
    { name: "dob", label: "Date of Birth", icon: <FaCalendarAlt />, type: "date" },
    { name: "nationality", label: "Nationality", icon: <FaGlobe />, type: "text" },
    { name: "idType", label: "ID Type", icon: <FaIdCard />, type: "text" },
    { name: "mobile", label: "Mobile Number", icon: <FaPhone />, type: "tel" },
    { name: "email", label: "Email Address", icon: <FaEnvelope />, type: "email" },
    { name: "address", label: "Address", icon: <FaMapMarkerAlt />, type: "text" },
    { name: "location", label: "Location", icon: <FaMapMarkerAlt />, type: "text" }
  ],
  experience: [
    { name: "position", label: "Position", type: "text" },
    { name: "company", label: "Company", type: "text" },
    { name: "startDate", label: "Start Date", type: "date" },
    { name: "endDate", label: "End Date", type: "date" },
    { name: "responsibilities", label: "Responsibilities", type: "textarea" }
  ],
  education: [
    { name: "degree", label: "Degree", type: "text" },
    { name: "institute", label: "Institute", type: "text" },
    { name: "startYear", label: "Start Year", type: "text" },
    { name: "endYear", label: "End Year", type: "text" },
    { name: "cgpa", label: "CGPA", type: "text" },
    { name: "highlights", label: "Highlights", type: "textarea" }
  ],
  skills: [
    { name: "primarySkills", label: "Primary Skills" },
    { name: "summary", label: "Professional Summary" }
  ]
};

export default function Profile() {
const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
const userId = storedUser?.id;

  const [loading, setLoading] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [showResume, setShowResume] = useState(false);

  /* ================= STATE (SCHEMA SAFE) ================= */
  const [profile, setProfile] = useState({
    name: "",
    dob: "",
    nationality: "",
    idType: "",
    mobile: "",
    email: "",
    address: "",
    location: "",
    resumeUrl: "",
    photoUrl: "",

    experience: [
      {
        position: "",
        company: "",
        startDate: "",
        endDate: "",
        responsibilities: ""
      }
    ],

    education: [
      {
        degree: "",
        institute: "",
        startYear: "",
        endYear: "",
        cgpa: "",
        highlights: ""
      }
    ],

    skills: {
      primarySkills: "",
      summary: ""
    },

    userId
  });

useEffect(() => {
  const loadProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`
      );

      if (res.data && res.data.userId) {
        setProfile({
          ...res.data,

          dob: formatDate(res.data.dob),

          experience: res.data.experience?.length
            ? res.data.experience.map((e) => ({
                ...e,
                startDate: formatDate(e.startDate),
                endDate: formatDate(e.endDate)
              }))
            : [{
                position: "",
                company: "",
                startDate: "",
                endDate: "",
                responsibilities: ""
              }],

          education: res.data.education?.length
            ? res.data.education
            : [{
                degree: "",
                institute: "",
                startYear: "",
                endYear: "",
                cgpa: "",
                highlights: ""
              }],

          skills: res.data.skills || {
            primarySkills: "",
            summary: ""
          }
        });
      }
    } catch (err) {
      console.error("Load Profile Error:", err);
    }
  };

  if (userId) loadProfile();
}, [userId]);


  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (e, section) => {
    const updated = [...profile[section]];
    updated[0][e.target.name] = e.target.value;

    setProfile({ ...profile, [section]: updated });
  };

  /* ================= CLOUDINARY ================= */
const uploadToCloudinary = async (file, type) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  // ✅ use correct preset based on type
  formData.append(
    "upload_preset",
    type === "resume" ? RESUME_UPLOAD_PRESET : IMAGE_UPLOAD_PRESET
  );

  // ✅ choose correct endpoint
  const endpoint =
    type === "resume"
      ? `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`
      : `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const res = await axios.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    // ✅ save correct URL
    setProfile((prev) => ({
      ...prev,
      [type === "photo" ? "photoUrl" : "resumeUrl"]: res.data.secure_url
    }));

    toast.success(type === "photo" ? "Photo uploaded 📸" : "Resume uploaded 📄");

    console.log("Cloudinary upload success:", {
      type,
      url: res.data.secure_url
    });
  } catch (err) {
    // 🔥 IMPORTANT: show real Cloudinary error
    console.error(
      "Cloudinary upload failed:",
      err?.response?.data || err
    );

    toast.error(
      err?.response?.data?.error?.message ||
      "Cloudinary upload failed"
    );
  }
};

  /* ================= COMPLETION ================= */
  useEffect(() => {
    let filled = 0;
    let total = 23;
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
    Object.values(profile.education[0]).forEach((v) => (filled += check(v)));
    Object.values(profile.skills).forEach((v) => (filled += check(v)));

    setPercentage(Math.floor((filled / total) * 100));
  }, [profile]);

  const getColor = () => {
    if (percentage < 40) return "danger";
    if (percentage < 80) return "warning";
    return "success";
  };
console.log("Saving profile for userId:", userId);
  /* ================= SAVE PROFILE ================= */
  const handleSubmit = async () => {
    setLoading(true);
    if (!userId) {
  toast.error("User not logged in");
  return;
}

    try {
      const payload = {
        ...profile,
        dob: profile.dob ? new Date(profile.dob) : null,
        experience: profile.experience
          .filter((e) => e.startDate)
          .map((e) => ({
            ...e,
            startDate: new Date(e.startDate),
            endDate: e.endDate ? new Date(e.endDate) : null
          })),
        education: profile.education
          .filter((e) => e.startYear)
          .map((e) => ({
            ...e,
            startYear: Number(e.startYear),
            endYear: e.endYear ? Number(e.endYear) : null
          })),
        userId
      };

      await axios.put(
  `${import.meta.env.VITE_API_BASE_URL}/profile/${userId}`,
  payload
);
    toast.success("Profile saved successfully 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div style={{ minHeight: "100vh", padding: "20px 0" }}>
      <Container style={{ maxWidth: "1000px" }}>
        <Card>
          <Card.Body>
            <ProgressBar
              animated
              now={percentage}
              variant={getColor()}
              className="mb-4"
            />

            {/* PERSONAL TAB */}
            <Tabs defaultActiveKey="personal" className="mb-4">
              <Tab eventKey="personal" title="Personal">
                {/* ================= PHOTO & RESUME UPLOAD ================= */}
<Card className="mb-4">
  <Card.Body>
    <Row>
      {/* PHOTO */}
      <Col md={6} className="mb-3 text-center">
        <Form.Label>
          <FaCamera /> Profile Photo
        </Form.Label>

        {profile.photoUrl ? (
          <img
            src={profile.photoUrl}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
              margin: "10px auto"
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
      toast.error("Only image files are allowed");
      return;
    }

    uploadToCloudinary(file, "photo");
  }}
/>
      </Col>

      {/* RESUME */}
      <Col md={6} className="mb-3">
        <Form.Label>
          <FaFileUpload /> Resume
        </Form.Label>

        <Form.Control
  type="file"
  accept="application/pdf"
  onChange={(e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF resumes are allowed");
      return;
    }

    uploadToCloudinary(file, "resume");
  }}
/>

{profile.resumeUrl && (
  <div className="mt-2 d-flex gap-2">
    <Button
      variant="outline-primary"
      size="sm"
      onClick={() => window.open(profile.resumeUrl, "_blank")}
    >
      View PDF
    </Button>
    
    <Button
      variant="outline-success"
      size="sm"
      onClick={() => {
        const downloadUrl = profile.resumeUrl.replace("/upload/", "/upload/fl_attachment/");
        window.location.href = downloadUrl;
      }}
    >
      Download
    </Button>
  </div>
)}
      </Col>
    </Row>
  </Card.Body>
</Card>

                <Row>
                  {fieldConfig.personal.map((f) => (
                    <Col md={6} key={f.name} className="mb-3">
                      <Form.Label>{f.label}</Form.Label>
                      <Form.Control
                        type={f.type}
                        name={f.name}
                        value={profile[f.name]}
                        onChange={handleChange}
                      />
                    </Col>
                  ))}
                </Row>
              </Tab>

              {/* EXPERIENCE TAB */}
              <Tab eventKey="experience" title="Experience">
                <Row>
                  {fieldConfig.experience.map((f) => (
                    <Col md={6} key={f.name} className="mb-3">
                      <Form.Label>{f.label}</Form.Label>
                      <Form.Control
                        type={f.type}
                        as={f.type === "textarea" ? "textarea" : "input"}
                        rows={f.type === "textarea" ? 4 : undefined}
                        name={f.name}
                        value={profile.experience[0][f.name]}
                        onChange={(e) =>
                          handleNestedChange(e, "experience")
                        }
                      />
                    </Col>
                  ))}
                </Row>
              </Tab>

              {/* EDUCATION TAB */}
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
                        onChange={(e) =>
                          handleNestedChange(e, "education")
                        }
                      />
                    </Col>
                  ))}
                </Row>
              </Tab>

              {/* SKILLS TAB */}
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
                          skills: {
                            ...profile.skills,
                            [f.name]: e.target.value
                          }
                        })
                      }
                    />
                  </Form.Group>
                ))}
              </Tab>
            </Tabs>

            <div className="text-center">
              <Button onClick={handleSubmit} disabled={loading}>
                <FaSave /> {loading ? "Saving..." : "Save Profile"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
