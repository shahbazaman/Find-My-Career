import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  FaDatabase, FaChartLine, FaUserTie, FaJava,
  FaChevronRight, FaCode, FaRobot, FaHeadset,
  FaPenNib, FaBriefcase
} from "react-icons/fa";
import "./css/Page2.css";

/* ── map keywords → icon + color ── */
const ROLE_STYLES = [
  { keyword: "data",        icon: <FaDatabase />,   color: "#4e73df" },
  { keyword: "analyst",     icon: <FaChartLine />,  color: "#1cc88a" },
  { keyword: "sales",       icon: <FaUserTie />,    color: "#f6c23e" },
  { keyword: "java",        icon: <FaJava />,       color: "#e74a3b" },
  { keyword: "frontend",    icon: <FaCode />,       color: "#36b9cc" },
  { keyword: "ai",          icon: <FaRobot />,      color: "#6610f2" },
  { keyword: "customer",    icon: <FaHeadset />,    color: "#fd7e14" },
  { keyword: "design",      icon: <FaPenNib />,     color: "#e83e8c" },
  { keyword: "backend",     icon: <FaCode />,       color: "#20c997" },
  { keyword: "engineer",    icon: <FaRobot />,      color: "#6f42c1" },
];

const DEFAULT_STYLE = { icon: <FaBriefcase />, color: "#6c757d" };

const getStyle = (title = "") => {
  const lower = title.toLowerCase();
  return (
    ROLE_STYLES.find((s) => lower.includes(s.keyword)) || DEFAULT_STYLE
  );
};

export default function Page2() {
  const [allRoles, setAllRoles]     = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  /* ── fetch jobs, count by jobTitle ── */
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/jobs`)
      .then((res) => {
        const jobs = res.data.jobs || [];

        // count occurrences of each jobTitle
        const countMap = {};
        jobs.forEach((j) => {
          const t = j.jobTitle?.trim();
          if (t) countMap[t] = (countMap[t] || 0) + 1;
        });

        // build role cards sorted by count desc
        const roles = Object.entries(countMap)
          .sort((a, b) => b[1] - a[1])
          .map(([title, count]) => {
            const style = getStyle(title);
            return {
              title,
              count: `${count} Job${count !== 1 ? "s" : ""}`,
              icon: style.icon,
              color: style.color,
            };
          });

        setAllRoles(roles);
      })
      .catch((err) => console.error("Page2 fetch error:", err));
  }, []);

  const totalPages   = Math.ceil(allRoles.length / itemsPerPage);
  const currentRoles = allRoles.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  const scrollToJobs = () => {
    const el = document.getElementById("jobs-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="job-opportunities-section">
      <Container>
        <Row className="align-items-center gy-5">
          {/* LEFT */}
          <Col lg={6} md={12} className="text-center text-lg-start">
            <h2 className="display-5 fw-bold mb-4 main-heading">
              Explore Job Opportunities in <br className="d-none d-md-block" />
              <span className="text-primary-gradient"> Popular Roles</span>
            </h2>

            <p className="text-muted lead mb-4 description-text">
              {allRoles.length > 0
                ? `Showing ${allRoles.length} unique roles. Page ${currentPage + 1} of ${totalPages || 1}.`
                : "Loading available roles..."}
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Button
                variant="primary"
                className="btn-custom rounded-pill shadow-lg"
                onClick={scrollToJobs}
              >
                Explore All Jobs <FaChevronRight className="ms-2" size={14} />
              </Button>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg={6} md={12}>
            {allRoles.length === 0 ? (
              <p className="text-muted text-center">Loading roles...</p>
            ) : (
              <>
                <div className="cards-wrapper" key={currentPage}>
                  {currentRoles.map((role, index) => (
                    <Card key={index} className="role-card border-0 shadow-sm animate-in">
                      <Card.Body className="d-flex align-items-center justify-content-between p-3">
                        <div className="d-flex align-items-center">
                          <div
                            className="icon-box"
                            style={{
                              backgroundColor: `${role.color}15`,
                              color: role.color,
                            }}
                          >
                            {role.icon}
                          </div>
                          <div className="ms-3 text-start">
                            <h6 className="mb-0 fw-bold">{role.title}</h6>
                            <small className="text-muted d-md-none">{role.count}</small>
                          </div>
                        </div>
                        <div className="d-none d-md-flex align-items-center">
                          <span className="job-badge">{role.count}</span>
                          <FaChevronRight className="ms-3 text-light-gray" />
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="custom-pagination mt-4">
                    {[...Array(totalPages)].map((_, idx) => (
                      <span
                        key={idx}
                        className={`dot ${currentPage === idx ? "active" : ""}`}
                        onClick={() => setCurrentPage(idx)}
                      />
                    ))}
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}