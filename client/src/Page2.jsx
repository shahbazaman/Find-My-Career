import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import {
  FaDatabase,
  FaChartLine,
  FaUserTie,
  FaJava,
  FaChevronRight,
  FaCode,
  FaRobot,
  FaHeadset,
  FaPenNib,
  FaPaperPlane
} from "react-icons/fa";
// import axios from "axios";
// import { toast } from "react-toastify";
import "./css/Page2.css";

export default function Page2() {
  /* ================= ROLES DATA ================= */
  const allRoles = [
    { title: "Data Scientist", count: "210 Jobs", icon: <FaDatabase />, color: "#4e73df" },
    { title: "Business Analyst", count: "254 Jobs", icon: <FaChartLine />, color: "#1cc88a" },
    { title: "Sales Executive", count: "580 Jobs", icon: <FaUserTie />, color: "#f6c23e" },
    { title: "Java Developer", count: "197 Jobs", icon: <FaJava />, color: "#e74a3b" },
    { title: "Frontend Dev", count: "420 Jobs", icon: <FaCode />, color: "#36b9cc" },
    { title: "AI Engineer", count: "104 Jobs", icon: <FaRobot />, color: "#6610f2" },
    { title: "Customer Service", count: "840 Jobs", icon: <FaHeadset />, color: "#fd7e14" },
    { title: "UI/UX Designer", count: "420 Jobs", icon: <FaPenNib />, color: "#e83e8c" }
  ];

  /* ================= PAGINATION ================= */
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(allRoles.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentRoles = allRoles.slice(startIndex, startIndex + itemsPerPage);

  /* ================= DUMMY EMAIL STATE ================= */
  const [showEmailBox, setShowEmailBox] = useState(false);
  const [emailText, setEmailText] = useState("");
  const [sending, setSending] = useState(false);

  const scrollToJobs = () => {
    const el = document.getElementById("jobs-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* ================= SEND DUMMY EMAIL ================= */
  // const handleSendDummyEmail = async () => {

  //   if (!emailText.trim()) {
  //     return toast.error("Message cannot be empty");
  //   }

  //   setSending(true);

  //   try {
  //     const res = await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}/email/test`,
  //       { message: emailText },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`
  //         }
  //       }
  //     );

  //     console.log("🟢 Email API response:", res.data);
  //     toast.success("Dummy email sent successfully!");
  //     setEmailText("");
  //     setShowEmailBox(false);
  //   } catch (error) {
  //     console.error("🔴 Dummy email failed:", error);
  //     toast.error("Failed to send dummy email");
  //   } finally {
  //     setSending(false);
  //   }
  // };

  return (
    <section className="job-opportunities-section">
      <Container>
        <Row className="align-items-center gy-5">
          {/* ===== LEFT CONTENT ===== */}
          <Col lg={6} md={12} className="text-center text-lg-start">
            <h2 className="display-5 fw-bold mb-4 main-heading">
              Explore Job Opportunities in <br className="d-none d-md-block" />
              <span className="text-primary-gradient"> Popular Roles</span>
            </h2>

            <p className="text-muted lead mb-4 description-text">
              Showing the best roles for your career growth. Page {currentPage + 1} of {totalPages}.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Button
                variant="primary"
                className="btn-custom rounded-pill shadow-lg"
                onClick={scrollToJobs}
              >
                Explore All Jobs <FaChevronRight className="ms-2" size={14} />
              </Button>

              {/* ✅ NEW BUTTON */}
              {/* <Button
                variant="outline-success"
                className="rounded-pill"
                onClick={() => setShowEmailBox(!showEmailBox)}
              >
                <FaPaperPlane className="me-2" />
                Send Dummy Email
              </Button> */}
            </div>

            {/* ===== DUMMY EMAIL BOX ===== */}
            {/* {showEmailBox && (
              <Card className="mt-4 shadow-sm">
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Dummy Email Content</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Type email message here..."
                      value={emailText}
                      onChange={(e) => setEmailText(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    variant="success"
                    onClick={handleSendDummyEmail}
                    disabled={sending}
                    className="w-100"
                  >
                    {sending ? "Sending..." : "Send Email"}
                  </Button>
                </Card.Body>
              </Card>
            )} */}
          </Col>

          {/* ===== RIGHT CARDS ===== */}
          <Col lg={6} md={12}>
            <div className="cards-wrapper" key={currentPage}>
              {currentRoles.map((role, index) => (
                <Card key={index} className="role-card border-0 shadow-sm animate-in">
                  <Card.Body className="d-flex align-items-center justify-content-between p-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="icon-box"
                        style={{ backgroundColor: `${role.color}15`, color: role.color }}
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

            {/* PAGINATION DOTS */}
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
