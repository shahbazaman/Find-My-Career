import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import {
  FaSearch, FaMapMarkerAlt, FaBriefcase,
  FaLaptopCode, FaUsers, FaIndustry, FaGraduationCap,
  FaArrowRight, FaChartLine,
  FaCode, FaRobot, FaHeadset, FaPenNib, FaDatabase,
  FaUserTie, FaCogs, FaBullhorn
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const ROLE_STYLES = [
  { keyword: "data",      color: "#3b82f6", bgColor: "#eff6ff", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", icon: <FaDatabase /> },
  { keyword: "developer", color: "#6366f1", bgColor: "#eef2ff", gradient: "linear-gradient(135deg, #667eea 0%, #4facfe 100%)", icon: <FaCode /> },
  { keyword: "engineer",  color: "#8b5cf6", bgColor: "#f5f3ff", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", icon: <FaCogs /> },
  { keyword: "design",    color: "#ec4899", bgColor: "#fdf2f8", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", icon: <FaPenNib /> },
  { keyword: "sales",     color: "#f59e0b", bgColor: "#fffbeb", gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", icon: <FaUserTie /> },
  { keyword: "hr",        color: "#f59e0b", bgColor: "#fffbeb", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", icon: <FaUsers /> },
  { keyword: "manager",   color: "#10b981", bgColor: "#ecfdf5", gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)", icon: <FaChartLine /> },
  { keyword: "analyst",   color: "#10b981", bgColor: "#ecfdf5", gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)", icon: <FaChartLine /> },
  { keyword: "intern",    color: "#10b981", bgColor: "#ecfdf5", gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)", icon: <FaGraduationCap /> },
  { keyword: "marketing", color: "#ef4444", bgColor: "#fef2f2", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)", icon: <FaBullhorn /> },
  { keyword: "support",   color: "#06b6d4", bgColor: "#ecfeff", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", icon: <FaHeadset /> },
  { keyword: "ai",        color: "#7c3aed", bgColor: "#f5f3ff", gradient: "linear-gradient(135deg, #a78bfa 0%, #7c3aed 100%)", icon: <FaRobot /> },
  { keyword: "it",        color: "#3b82f6", bgColor: "#eff6ff", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", icon: <FaLaptopCode /> },
];

const DEFAULT_STYLE = {
  color: "#6c757d", bgColor: "#f8f9fa",
  gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", icon: <FaBriefcase />
};

const getStyle = (title = "") => {
  const lower = title.toLowerCase();
  return ROLE_STYLES.find((s) => lower.includes(s.keyword)) || DEFAULT_STYLE;
};

const IS_JOB_SEEKER = (role) => role === "job seekers";
const CAN_VIEW_SEARCH = (role) => role === "job seekers";
const IS_RECRUITER = (role) => role?.toLowerCase().includes("recruiter");

export default function JobSearchPage() {
  const [role, setRole]               = useState("guest");
  const [roleLoading, setRoleLoading] = useState(true);
  const [skills, setSkills]           = useState("");
  const [experience, setExperience]   = useState("");
  const [location, setLocation]       = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredCompany, setHoveredCompany]   = useState(null);
  const navigate = useNavigate();
  const [realCategories, setRealCategories] = useState([]);
  const [realCompanies, setRealCompanies]   = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCompanies, setLoadingCompanies]   = useState(true);
  const userId = localStorage.getItem("userId");

  /* ── Fetch user role ── */
  useEffect(() => {
    if (!userId) { setRoleLoading(false); return; }
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`)
      .then((res) => setRole(res.data.role))
      .catch((err) => console.error(err))
      .finally(() => setRoleLoading(false));
  }, [userId]);

  /* ── Fetch job categories ── */
  useEffect(() => {
    setLoadingCategories(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/jobs`)
      .then((res) => {
        const jobs = res.data.jobs || [];
        const countMap = {};
        jobs.forEach((j) => {
          const t = j.jobTitle?.trim();
          if (t) countMap[t] = (countMap[t] || 0) + 1;
        });
        const cats = Object.entries(countMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([title, count]) => {
            const s = getStyle(title);
            return { title, jobs: count.toLocaleString(), ...s };
          });
        setRealCategories(cats);
      })
      .catch((err) => console.error("Category fetch error:", err))
      .finally(() => setLoadingCategories(false));
  }, []);
useEffect(() => {
  if (!roleLoading) console.log("ROLE:", JSON.stringify(role));
}, [roleLoading]);
  /* ── Fetch companies ── */
  useEffect(() => {
    setLoadingCompanies(true);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/companies`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setRealCompanies(data);
      })
      .catch((err) => console.error("Companies fetch error:", err))
      .finally(() => setLoadingCompanies(false));
  }, []);
useEffect(() => {
  if (!roleLoading) console.log("ROLE:", role);
}, [roleLoading]);
  const dummyCategories = [
    { icon: <FaGraduationCap />, title: "Freshers",      jobs: "21,442", color: "#10b981", bgColor: "#ecfdf5", gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)" },
    { icon: <FaLaptopCode />,    title: "IT",             jobs: "43,456", color: "#3b82f6", bgColor: "#eff6ff", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { icon: <FaUsers />,         title: "HR",             jobs: "14,125", color: "#f59e0b", bgColor: "#fffbeb", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { icon: <FaIndustry />,      title: "Manufacturing",  jobs: "12,878", color: "#8b5cf6", bgColor: "#f5f3ff", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  ];

  const displayCategories = realCategories.length > 0 ? realCategories : dummyCategories;

  const buildCompanyList = () => {
    if (realCompanies.length > 0) {
      return realCompanies.map((c, i) => ({
        name: c.name || c.companyName || "Company",
        logo: c.logo || null,
        color: "#667eea",
        _id: c._id || i,
      }));
    }
    return [
      { name: "Walmart",    logo: null, color: "#0071ce" },
      { name: "HCLTech",    logo: null, color: "#0066b2" },
      { name: "TCS",        logo: null, color: "#2a3a8f" },
      { name: "AMAZON",     logo: null, color: "#ff9900" },
      { name: "DirectAxis", logo: null, color: "#1e40af" },
      { name: "ACCENTURE",  logo: null, color: "#a100ff" },
    ];
  };

  const companyList     = buildCompanyList();
  const loopedCompanies = [...companyList, ...companyList, ...companyList];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ skills, experience, location });
  };

if (roleLoading) return null;
if (IS_RECRUITER(role)) return null;
if (!CAN_VIEW_SEARCH(role)) return null;
  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>

      {/* Animated background blobs */}
      <div style={{ position: "absolute", top: "10%", left: "5%", width: "400px", height: "400px", background: "rgba(255,255,255,0.1)", borderRadius: "50%", filter: "blur(100px)", animation: "float 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "500px", height: "500px", background: "rgba(255,255,255,0.08)", borderRadius: "50%", filter: "blur(100px)", animation: "float 10s ease-in-out infinite reverse" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: "300px", height: "300px", background: "rgba(255,255,255,0.05)", borderRadius: "50%", filter: "blur(80px)", animation: "pulse 6s ease-in-out infinite" }} />

      <Container fluid style={{ padding: "40px 15px", position: "relative", zIndex: 1 }}>

        {/* ── Search Bar ── */}
        {CAN_VIEW_SEARCH(role) && (
<Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card style={{
              borderRadius: "30px", border: "none",
              boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(10px)",
              animation: "scaleIn 0.6s ease-out 0.8s both"
            }}>
              <Card.Body style={{ padding: "40px" }}>
                <Form onSubmit={handleSearch}>
                  <Row className="g-4">
                    <Col xs={12} md={4}>
                      <div style={inputBoxStyle}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#764ba2"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(118,75,162,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
                        <FaSearch style={{ color: "#764ba2", fontSize: "20px" }} />
                        <Form.Control placeholder="Skills, Job Title..." value={skills} onChange={(e) => setSkills(e.target.value)} style={inputCtrlStyle} />
                      </div>
                    </Col>
                    <Col xs={12} md={3}>
                      <div style={inputBoxStyle}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#764ba2"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(118,75,162,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
                        <FaBriefcase style={{ color: "#764ba2", fontSize: "20px" }} />
                        <Form.Select value={experience} onChange={(e) => setExperience(e.target.value)} style={inputCtrlStyle}>
                          <option value="">Experience</option>
                          <option value="0-1">0-1 years</option>
                          <option value="1-3">1-3 years</option>
                          <option value="3-5">3-5 years</option>
                          <option value="5+">5+ years</option>
                        </Form.Select>
                      </div>
                    </Col>
                    <Col xs={12} md={3}>
                      <div style={inputBoxStyle}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#764ba2"; e.currentTarget.style.boxShadow = "0 4px 15px rgba(118,75,162,0.2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.boxShadow = "none"; }}>
                        <FaMapMarkerAlt style={{ color: "#764ba2", fontSize: "20px" }} />
                        <Form.Control placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} style={inputCtrlStyle} />
                      </div>
                    </Col>
                    <Col xs={12} md={2}>
                      <Button type="submit" style={{
                        background: "linear-gradient(135deg, #667eea, #764ba2)", border: "none",
                        borderRadius: "15px", height: "100%", width: "100%",
                        fontSize: "1.1rem", fontWeight: "600",
                        boxShadow: "0 10px 30px rgba(118,75,162,0.4)",
                        transition: "all 0.3s ease",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 15px 40px rgba(118,75,162,0.5)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 10px 30px rgba(118,75,162,0.4)"; }}>
                        Search <FaArrowRight />
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        )}

        {/* ── Browse by Category + Top Companies ── */}
        {CAN_VIEW_SEARCH(role) && (
<Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card style={{
              borderRadius: "30px", border: "none",
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(10px)",
              overflow: "hidden"
            }}>
              <Card.Body style={{ padding: "50px 40px" }}>

                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1f2937" }}>Browse by Category</h2>
                  <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                    {loadingCategories
                      ? "Loading categories..."
                      : `Top ${displayCategories.length} job categories from live listings`}
                  </p>
                </div>

                <Row className="g-4 mb-5">
                  {displayCategories.map((cat, i) => (
                    <Col key={i} xs={12} sm={6} md={3}>
                      <Card
                        className="h-100"
                        style={{
                          background: hoveredCategory === i ? cat.gradient : cat.bgColor,
                          borderRadius: "25px", textAlign: "center", border: "none",
                          cursor: "pointer",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          transform: hoveredCategory === i ? "translateY(-15px) scale(1.05)" : "translateY(0) scale(1)",
                          boxShadow: hoveredCategory === i ? "0 25px 50px rgba(0,0,0,0.25)" : "0 5px 15px rgba(0,0,0,0.08)"
                        }}
                        onMouseEnter={() => setHoveredCategory(i)}
                        onMouseLeave={() => setHoveredCategory(null)}
                        onClick={() => navigate(`/jobs?title=${encodeURIComponent(cat.title)}`)} 
                      >
                        <Card.Body style={{ padding: "28px 16px" }}>
                          <div style={{
                            fontSize: "3rem",
                            color: hoveredCategory === i ? "white" : cat.color,
                            marginBottom: "16px",
                            transition: "all 0.3s ease",
                            display: "flex", justifyContent: "center"
                          }}>
                            {cat.icon}
                          </div>
                          <h5 style={{
                            fontSize: "1.2rem", fontWeight: "700",
                            color: hoveredCategory === i ? "white" : "#1f2937",
                            marginBottom: "8px",
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                          }}>
                            {cat.title}
                          </h5>
                          <p style={{
                            fontSize: "1rem",
                            color: hoveredCategory === i ? "rgba(255,255,255,0.9)" : "#6b7280",
                            margin: 0, fontWeight: "500"
                          }}>
                            {cat.jobs} {parseInt(String(cat.jobs).replace(/,/g, "")) === 1 ? "Job" : "Jobs"}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <h2 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1f2937" }}>Top Companies Hiring Now</h2>
                  <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                    {loadingCompanies
                      ? "Loading companies..."
                      : realCompanies.length > 0
                        ? `${realCompanies.length} companies actively hiring`
                        : "Join the world's leading organizations"}
                  </p>
                </div>

                <div style={{ overflow: "hidden", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to right, rgba(255,255,255,1), transparent)", zIndex: 2, pointerEvents: "none" }} />
                  <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "60px", background: "linear-gradient(to left, rgba(255,255,255,1), transparent)", zIndex: 2, pointerEvents: "none" }} />
                  <div style={{ display: "flex", gap: "20px", animation: "scroll 25s linear infinite", paddingBottom: "8px" }}>
                    {loopedCompanies.map((c, i) => (
                      <Card key={i} style={{
                        padding: "10px 18px", minWidth: "200px", borderRadius: "20px",
                        border: `2px solid ${hoveredCompany === i ? c.color : "#e5e7eb"}`,
                        background: hoveredCompany === i ? c.color : "white",
                        cursor: "pointer", transition: "all 0.3s ease",
                        transform: hoveredCompany === i ? "scale(1.08)" : "scale(1)",
                        boxShadow: hoveredCompany === i ? "0 15px 40px rgba(0,0,0,0.2)" : "0 5px 15px rgba(0,0,0,0.06)",
                        flexShrink: 0
                      }}
                        onMouseEnter={() => setHoveredCompany(i)}
                        onMouseLeave={() => setHoveredCompany(null)}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                          {c.logo ? (
                            <img src={c.logo} alt={c.name}
                              style={{ width: "26px", height: "26px", borderRadius: "6px", objectFit: "cover" }}
                              onError={(e) => { e.target.style.display = "none"; }} />
                          ) : (
                            <div style={{
                              width: "26px", height: "26px", borderRadius: "6px",
                              background: hoveredCompany === i ? "rgba(255,255,255,0.3)" : `${c.color}20`,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "12px", fontWeight: "700",
                              color: hoveredCompany === i ? "white" : c.color
                            }}>
                              {c.name?.[0]?.toUpperCase()}
                            </div>
                          )}
                          <strong style={{
                            color: hoveredCompany === i ? "white" : "#1f2937",
                            fontSize: "1rem", transition: "all 0.3s ease", whiteSpace: "nowrap"
                          }}>
                            {c.name}
                          </strong>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

              </Card.Body>
            </Card>
          </Col>
        </Row>)}

        {/* ── View All Jobs CTA ── */}
        {CAN_VIEW_SEARCH(role) && (
<Row className="justify-content-center mt-5">
          <Col lg={5} md={6} style={{ justifyItems: "center" }}>
            <Button style={{
              width: "100%", maxWidth: "220px",
              padding: "10px 5px", borderRadius: "20px",
              background: "white", color: "#764ba2",
              fontWeight: "700", fontSize: "1.3rem",
              border: "none", boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "12px"
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px) scale(1.05)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.4)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)"; }}>
              View All Jobs <FaArrowRight />
            </Button>
          </Col>
        </Row>)}

      </Container>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.7; }
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

const inputBoxStyle = {
  display: "flex", alignItems: "center", gap: "12px",
  padding: "18px 20px", background: "#f9fafb",
  borderRadius: "15px", border: "2px solid #e5e7eb",
  transition: "all 0.3s ease"
};

const inputCtrlStyle = {
  border: "none", background: "transparent",
  boxShadow: "none", padding: "0", fontSize: "1rem"
};