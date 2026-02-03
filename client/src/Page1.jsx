import React, { useState, useEffect } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { 
  FaSearch, FaMapMarkerAlt, FaBriefcase, FaStar,
  FaLaptopCode, FaUsers, FaIndustry, FaGraduationCap,
  FaBuilding, FaArrowRight, FaRocket, FaTrophy, FaChartLine
} from "react-icons/fa";

export default function JobSearchPage() {
  const [role, setRole] = useState("guest"); 
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [recRole, setRecRole] = useState("");
  const [recExperience, setRecExperience] = useState("");
  const [recLocation, setRecLocation] = useState("");
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredCompany, setHoveredCompany] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios
  .get(`${import.meta.env.VITE_API_BASE_URL}/users/${userId}`)
  .then((res) => {
    console.log("ROLE FROM API 👉", res.data.role);
setRole(res.data.role);
  }).catch((err) => console.error(err));
  }, [userId]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ skills, experience, location });
  };

  const handleRecruiterSearch = (e) => {
    e.preventDefault();
    console.log({ recRole, recExperience, recLocation });
  };

  const categories = [
    { icon: <FaGraduationCap />, title: "Freshers", jobs: "21,442", color: "#10b981", bgColor: "#ecfdf5", gradient: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)" },
    { icon: <FaLaptopCode />, title: "IT", jobs: "43,456", color: "#3b82f6", bgColor: "#eff6ff", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { icon: <FaUsers />, title: "HR", jobs: "14,125", color: "#f59e0b", bgColor: "#fffbeb", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { icon: <FaIndustry />, title: "Manufacturing", jobs: "12,878", color: "#8b5cf6", bgColor: "#f5f3ff", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
  ];

  const companies = [
    { name: "Walmart", color: "#0071ce", logo: "W" },
    { name: "HCLTech", color: "#0066b2", logo: "H" },
    { name: "TCS", color: "#2a3a8f", logo: "T" },
    { name: "AMAZON", color: "#ff9900", logo: "A" },
    { name: "DirectAxis", color: "#1e40af", logo: "D" },
    { name: "ACCENTURE", color: "#a100ff", logo: "AC" },
  ];

  const stats = [
    { icon: <FaBriefcase />, number: "120K+", label: "Active Jobs", color: "#667eea" },
    { icon: <FaBuilding />, number: "5,000+", label: "Companies", color: "#f093fb" },
    { icon: <FaUsers />, number: "2M+", label: "Job Seekers", color: "#4facfe" },
    { icon: <FaTrophy />, number: "98%", label: "Success Rate", color: "#10b981" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    
      position: "relative",
      overflow: "hidden",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>

      {/* Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "10%",
        left: "5%",
        width: "400px",
        height: "400px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "50%",
        filter: "blur(100px)",
        animation: "float 8s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute",
        bottom: "10%",
        right: "5%",
        width: "500px",
        height: "500px",
        background: "rgba(255, 255, 255, 0.08)",
        borderRadius: "50%",
        filter: "blur(100px)",
        animation: "float 10s ease-in-out infinite reverse"
      }} />
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "300px",
        height: "300px",
        background: "rgba(255, 255, 255, 0.05)",
        borderRadius: "50%",
        filter: "blur(80px)",
        animation: "pulse 6s ease-in-out infinite"
      }} />

      <Container fluid style={{ padding: "40px 15px", position: "relative", zIndex: 1 }}>

        {/* Hero Section with Stats */}

        {/* Search Section */}
        {role === "job seekers" && (
          <Row className="justify-content-center mb-5">
            <Col lg={10}>
              <Card style={{ 
                borderRadius: "30px", 
                border: "none", 
                boxShadow: "0 30px 80px rgba(0,0,0,0.3)",
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(10px)",
                animation: "scaleIn 0.6s ease-out 0.8s both"
              }}>
                <Card.Body style={{ padding: "40px" }}>
                  <Form onSubmit={handleSearch}>
                    <Row className="g-4">
                      <Col xs={12} md={4}>
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "12px", 
                          padding: "18px 20px", 
                          background: "#f9fafb", 
                          borderRadius: "15px", 
                          border: "2px solid #e5e7eb",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#764ba2";
                          e.currentTarget.style.boxShadow = "0 4px 15px rgba(118, 75, 162, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                          e.currentTarget.style.boxShadow = "none";
                        }}>
                          <FaSearch style={{ color: "#764ba2", fontSize: "20px" }} />
                          <Form.Control
                            placeholder="Skills, Job Title..."
                            value={skills}
                            onChange={(e) => setSkills(e.target.value)}
                            style={{ 
                              border: "none", 
                              background: "transparent", 
                              boxShadow: "none", 
                              padding: "0",
                              fontSize: "1rem"
                            }}
                          />
                        </div>
                      </Col>

                      <Col xs={12} md={3}>
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "12px", 
                          padding: "18px 20px", 
                          background: "#f9fafb", 
                          borderRadius: "15px", 
                          border: "2px solid #e5e7eb",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#764ba2";
                          e.currentTarget.style.boxShadow = "0 4px 15px rgba(118, 75, 162, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                          e.currentTarget.style.boxShadow = "none";
                        }}>
                          <FaBriefcase style={{ color: "#764ba2", fontSize: "20px" }} />
                          <Form.Select
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            style={{ 
                              border: "none", 
                              background: "transparent", 
                              boxShadow: "none", 
                              padding: "0",
                              fontSize: "1rem"
                            }}
                          >
                            <option value="">Experience</option>
                            <option value="0-1">0-1 years</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5+">5+ years</option>
                          </Form.Select>
                        </div>
                      </Col>

                      <Col xs={12} md={3}>
                        <div style={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: "12px", 
                          padding: "18px 20px", 
                          background: "#f9fafb", 
                          borderRadius: "15px", 
                          border: "2px solid #e5e7eb",
                          transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#764ba2";
                          e.currentTarget.style.boxShadow = "0 4px 15px rgba(118, 75, 162, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "#e5e7eb";
                          e.currentTarget.style.boxShadow = "none";
                        }}>
                          <FaMapMarkerAlt style={{ color: "#764ba2", fontSize: "20px" }} />
                          <Form.Control
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            style={{ 
                              border: "none", 
                              background: "transparent", 
                              boxShadow: "none", 
                              padding: "0",
                              fontSize: "1rem"
                            }}
                          />
                        </div>
                      </Col>

                      <Col xs={12} md={2}>
                        <Button 
                          type="submit" 
                          style={{ 
                            background: "linear-gradient(135deg, #667eea, #764ba2)", 
                            border: "none", 
                            borderRadius: "15px", 
                            height: "100%", 
                            width: "100%",
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            boxShadow: "0 10px 30px rgba(118, 75, 162, 0.4)",
                            transition: "all 0.3s ease",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "8px"
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-3px)";
                            e.currentTarget.style.boxShadow = "0 15px 40px rgba(118, 75, 162, 0.5)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 10px 30px rgba(118, 75, 162, 0.4)";
                          }}>
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


        {/* Categories */}
        <Row className="justify-content-center mb-5">
          <Col lg={10}>
            <Card style={{ 
              borderRadius: "30px", 
              border: "none", 
              boxShadow: "0 20px 60px rgba(0,0,0,0.2)", 
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(10px)",
              overflow:"hidden"
            }}>
              <Card.Body style={{ padding: "50px 40px" }}>
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                  <h2 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1f2937" }}>
                    Browse by Category
                  </h2>
                  <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                    Explore opportunities across different industries
                  </p>
                </div>
                <Row className="g-4">
                  {categories.map((cat, i) => (
                    <Col key={i} xs={12} sm={6} md={3}>
                      <Card 
                        className="h-100" 
                        style={{ 
                          background: hoveredCategory === i ? cat.gradient : cat.bgColor,
                          borderRadius: "25px", 
                          textAlign: "center",
                          border: "none",
                          cursor: "pointer",
                          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                          transform: hoveredCategory === i ? "translateY(-15px) scale(1.05)" : "translateY(0) scale(1)",
                          boxShadow: hoveredCategory === i ? "0 25px 50px rgba(0,0,0,0.25)" : "0 5px 15px rgba(0,0,0,0.08)"
                        }}
                        onMouseEnter={() => setHoveredCategory(i)}
                        onMouseLeave={() => setHoveredCategory(null)}>
                        <Card.Body style={{ padding: "8px 4px" }}>
                          <div style={{ 
                            fontSize: "3.5rem", 
                            color: hoveredCategory === i ? "white" : cat.color,
                            marginBottom: "20px",
                            transition: "all 0.3s ease",
                            animation: hoveredCategory === i ? "bounce 0.6s ease" : "none",
                            maxHeight:"60px"
                          }}>
                            {cat.icon}
                          </div>
                          <h5 style={{ 
                            fontSize: "1.4rem", 
                            fontWeight: "700",
                            color: hoveredCategory === i ? "white" : "#1f2937",
                            marginBottom: "10px"
                          }}>
                            {cat.title}
                          </h5>
                          <p style={{ 
                            fontSize: "1.1rem",
                            color: hoveredCategory === i ? "rgba(255,255,255,0.9)" : "#6b7280",
                            margin: 0,
                            fontWeight: "500"
                          }}>
                            {cat.jobs} Jobs
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                <div style={{ textAlign: "center", marginBottom: "20px",marginTop:"40px" }}>
                  <h2 style={{ fontSize: "2.5rem", fontWeight: "700", color: "#1f2937" }}>
                    Top Companies Hiring Now
                  </h2>
                  <p style={{ color: "#6b7280", fontSize: "1.1rem" }}>
                    Join the world's leading organizations
                  </p>
                </div>
                <div style={{ 
                  display: "flex", 
                  gap: "30px", 
                  animation: "scroll 25s linear infinite",
                  paddingBottom: "0px"
                }}>
                  {[...companies, ...companies, ...companies].map((c, i) => (
                    <Card 
                      key={i} 
                      style={{ 
                        padding: "7px 10px", 
                        minWidth: "220px",
                        borderRadius: "20px",
                        border: "2px solid #e5e7eb",
                        background: hoveredCompany === i ? c.color : "white",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        transform: hoveredCompany === i ? "scale(1.1)" : "scale(1)",
                        boxShadow: hoveredCompany === i ? "0 15px 40px rgba(0,0,0,0.2)" : "0 5px 15px rgba(0,0,0,0.08)"
                      }}
                      onMouseEnter={() => setHoveredCompany(i)}
                      onMouseLeave={() => setHoveredCompany(null)}>
                      <div style={{ textAlign: "center" }}>
                      
                        <strong style={{ 
                          color: hoveredCompany === i ? "white" : c.color,
                          fontSize: "1.2rem",
                          transition: "all 0.3s ease"
                        }}>
                          {c.name}
                        </strong>
                      </div>
                    </Card>
                  ))}
                </div>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* CTA */}
        {role === "job seekers" && (<Row className="justify-content-center mt-5">
          <Col lg={5} md={6} style={{justifyItems:"center"}}>
            <Button style={{ 
              width: "100%", 
              maxWidth:"220px",
              padding: "10px 5px", 
              borderRadius: "20px",
              background: "white",
              color: "#764ba2",
              fontWeight: "700",
              fontSize: "1.3rem",
              border: "none",
              boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px) scale(1.05)";
              e.currentTarget.style.boxShadow = "0 20px 50px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0) scale(1)";
              e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
            }}>
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
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}