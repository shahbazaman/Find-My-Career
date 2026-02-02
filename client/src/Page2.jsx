import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FaDatabase, FaChartLine, FaUserTie, FaJava, FaChevronRight, FaCode, FaRobot, FaHeadset, FaPenNib } from "react-icons/fa";
import './css/Page2.css';

export default function Page2() {
  // 1. Extended Data for Pagination
  const allRoles = [
    { title: "Data Scientist", count: "2,213 Jobs", icon: <FaDatabase />, color: "#4e73df" },
    { title: "Business Analyst", count: "2,194 Jobs", icon: <FaChartLine />, color: "#1cc88a" },
    { title: "Sales Executive", count: "2,020 Jobs", icon: <FaUserTie />, color: "#f6c23e" },
    { title: "Java Developer", count: "1,621 Jobs", icon: <FaJava />, color: "#e74a3b" },
    { title: "Frontend Dev", count: "1,102 Jobs", icon: <FaCode />, color: "#36b9cc" },
    { title: "AI Engineer", count: "950 Jobs", icon: <FaRobot />, color: "#6610f2" },
    { title: "Customer Success", count: "840 Jobs", icon: <FaHeadset />, color: "#fd7e14" },
    { title: "UI/UX Designer", count: "720 Jobs", icon: <FaPenNib />, color: "#e83e8c" },
  ];

  // 2. Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allRoles.length / itemsPerPage);

  // 3. Logic to get current items
  const startIndex = currentPage * itemsPerPage;
  const currentRoles = allRoles.slice(startIndex, startIndex + itemsPerPage);

  const scrollToJobs = () => {
    const el = document.getElementById('jobs-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="job-opportunities-section">
      <Container>
        <Row className="align-items-center gy-5">
          <Col lg={6} md={12} className="text-center text-lg-start">
            <h2 className="display-5 fw-bold mb-4 main-heading">
              Explore Job Opportunities in <br className="d-none d-md-block" /> 
              <span className="text-primary-gradient">Popular Roles</span>
            </h2>
            <p className="text-muted lead mb-4 description-text">
              Showing the best roles for your career growth. Page {currentPage + 1} of {totalPages}.
            </p>
            <Button variant="primary" className="btn-custom rounded-pill shadow-lg" onClick={scrollToJobs}>
              Explore All Jobs <FaChevronRight className="ms-2" size={14} />
            </Button>
          </Col>

          <Col lg={6} md={12}>
            {/* Animated Wrapper for Cards */}
            <div className="cards-wrapper" key={currentPage}>
              {currentRoles.map((role, index) => (
                <Card key={index} className="role-card border-0 shadow-sm animate-in">
                  <Card.Body className="d-flex align-items-center justify-content-between p-3">
                    <div className="d-flex align-items-center">
                      <div className="icon-box" style={{ backgroundColor: `${role.color}15`, color: role.color }}>
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

            {/* Functional Pagination Dots */}
            <div className="custom-pagination mt-4">
              {[...Array(totalPages)].map((_, idx) => (
                <span 
                  key={idx}
                  className={`dot ${currentPage === idx ? "active" : ""}`}
                  onClick={() => setCurrentPage(idx)}
                ></span>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}