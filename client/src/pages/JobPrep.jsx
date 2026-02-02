import React, { useState } from "react";
import { Card, ProgressBar, Button, Form, Badge, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { 
  FiSearch, FiBookOpen, FiClock, FiTrendingUp, 
  FiCode, FiDatabase, FiLayout, FiShield, 
  FiCpu, FiTerminal, FiGlobe, FiBriefcase,
  FiExternalLink
} from "react-icons/fi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlinePlayCircle, MdOutlineClass } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BarChart } from "@mui/x-charts";

// External Hero Background
const HERO_BG = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

const customStyles = `
  /* The Scroll Functionality for the Course Column */
  .course-scroll-area {
    max-height: 750px;
    overflow-y: auto;
    padding-right: 15px;
    scrollbar-width: thin;
    scrollbar-color: #141212 #f8f9fa;
  }
  .course-scroll-area::-webkit-scrollbar {
    width: 6px;
  }
  .course-scroll-area::-webkit-scrollbar-thumb {
    background-color: #0d6efd;
    border-radius: 10px;
  }
  .course-card-hover:hover {
    transform: translateX(5px);
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(0,0,0,0.8) !important;
  }
`
export default function CompleteLearningDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const courses = [
    { title: "Data Structures & Algorithms", hours: 40, progress: 45, status: "In progress", icon: <MdOutlineClass />, notesUrl: () => navigate("/dsaNotes"), questionsUrl: () => navigate("/dsa"), category: "Coding" },
    { title: "Technical Aptitude", hours: 12, progress: 100, status: "Completed", icon: <HiOutlineLightningBolt />, notesUrl: () => navigate("/aptitudeNotes"), questionsUrl: () => navigate("/aptitude"), category: "Interviews" },
    { title: "Object Oriented Programming", hours: 4, progress: 0, status: "Not Started", icon: <FiTrendingUp />, notesUrl: () => navigate("/oopsNotes"), questionsUrl: () => navigate("/oops"), category: "Theory" },
    { title: "Communication Skills", hours: 2, progress: 20, status: "In progress", icon: <FiBookOpen />, notesUrl: () => navigate("/englishNotes"), questionsUrl: () => navigate("/english"), category: "Soft Skills" },
    { title: "Database Management (SQL)", hours: 4, progress: 0, status: "Not Started", icon: <FiDatabase />, notesUrl: () => navigate("/dbmsNotes"), questionsUrl: () => navigate("/dbms"), category: "Theory" },
    { title: "React.js Mastery", hours: 10, progress: 0, status: "Not Started", icon: <FiLayout />,notesUrl: () => navigate("/reactNotes"), questionsUrl: () => navigate("/react"), category: "Coding" },
    { title: "MERN Programming", hours: 12, progress: 0, status: "Not Started", icon: <FiCode />, notesUrl: () => navigate("/mernNotes"), questionsUrl: () => navigate("/mern"), category: "Coding" }
   ];

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

function CourseCard({
  title,
  hours,
  progress,
  status,
  icon,
  notesUrl,
  questionsUrl,
  category,
}) {
  const isComplete = status === "Completed";

  const handleMcqOnClick = () => {
    if (typeof questionsUrl === "function") {
      questionsUrl(); // internal route (navigate)
    } else {
      window.open(questionsUrl, "_blank"); // external link
    }
  };
const handleNotesOnClick = () => {
  if (typeof notesUrl === "function") {
    notesUrl(); // internal route (navigate)
  } else {
    window.open(notesUrl, "_blank"); // external link
  }
};

  return (
    <Card
      className="border-0 shadow-sm rounded-4 p-3 course-card-hover"
      style={{
        borderLeft: isComplete ? "6px solid #198754" : "6px solid #0d6efd",
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <div
          className="rounded-4 p-3 d-none d-sm-flex align-items-center justify-content-center flex-shrink-0"
          style={{
            backgroundColor: "#f0f4ff",
            color: "#0d6efd",
            fontSize: "24px",
          }}
        >
          {icon}
        </div>

        <div className="flex-grow-1 overflow-hidden">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <Badge
                bg="light"
                text="dark"
                className="border mb-1"
                style={{ fontSize: "9px" }}
              >
                {category}
              </Badge>
              <h6 className="fw-bold text-dark mb-1 text-truncate">
                {title}
              </h6>
              <small className="text-muted">
                <FiClock /> {hours} hours
              </small>
            </div>
            <Badge
              pill
              bg={isComplete ? "success" : "primary"}
              className="px-3 mt-3"
              style={{ fontSize: "9px" }}
            >
              {status}
            </Badge>
          </div>

          <ProgressBar
            now={progress}
            variant={isComplete ? "success" : "primary"}
            style={{ height: "6px" }}
            className="mb-3 rounded-pill"
          />

          <div className="d-flex gap-2">
            <Button
              size="sm"
              variant="primary"
              className="rounded-pill px-3 fw-bold"
              onClick={handleNotesOnClick}
            >
              <MdOutlinePlayCircle /> Notes
            </Button>
            <Button
              size="sm"
              variant="outline-secondary"
              className="rounded-pill px-3 fw-bold"
              onClick={handleMcqOnClick}
            >
              <FiBookOpen /> MCQs
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
} 

  return (
    <div className="container-fluid py-4 px-md-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <style>{customStyles}</style>
      <ToastContainer position="top-center" />
      
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <div>
          <h2 className="fw-bold text-dark mb-0">Placement Hub</h2>
          <p className="text-muted small">Vertical Path • 12 Modules</p>
        </div>
        <div className="position-relative" style={{ minWidth: "320px" }}>
          <FiSearch className="position-absolute top-50 translate-middle-y ms-3 text-muted" />
          <Form.Control
            type="text"
            placeholder="Search courses..."
            className="ps-5 py-2 border-0 shadow-sm rounded-pill"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Hero Section with BG Image */}
      <Card
        className="border-0 rounded-4 mb-5 shadow-lg overflow-hidden"
        style={{ 
          height: "280px",
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.2)), url(${HERO_BG})`, 
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white"
        }}
      >
        <Card.Body className="d-flex flex-column justify-content-center px-4 px-md-5">
          <Badge bg="primary" className="mb-2 px-3 py-2" style={{ width: 'fit-content mt-2' }}>2026 PREP ONLINE</Badge>
          <h1 className="fw-bold mb-2 display-5">Technical Mastery</h1>
          <p className="fs-5 opacity-75 mb-4">Your single column to success. Videos, Notes, and Progress Tracking.</p>
          <Button 
            variant="light" 
            className="rounded-pill px-4 py-2 d-flex align-items-center gap-2 fw-bold shadow text-primary"
            onClick={() => window.open("https://roadmap.sh/", "_blank")}
            style={{ width: 'fit-content' }}
          >
            <FiExternalLink size={20} /> View Roadmap
          </Button>
        </Card.Body>
      </Card>

      <Row className="g-4">
        {/* Left Column: VERTICAL SCROLLABLE LIST */}
        <Col lg={7}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-bold text-dark m-0">Course Modules</h5>
          </div>

          <div className="course-scroll-area">
            <div className="d-flex flex-column gap-3">
              {filteredCourses.map((item, idx) => (
                <CourseCard key={idx} {...item} />
              ))}
            </div>
          </div>
        </Col>

        {/* Right Column: FIXED STATS */}
        <Col lg={5}>
          <div className="sticky-top" style={{ top: "20px" }}>
            <h5 className="fw-bold text-dark mb-4">Analytics</h5>
            <Row className="g-3 mb-4">
              <Col xs={6}>
                <Card className="border-0 shadow-sm rounded-4 p-4 text-center">
                  <FiClock className="text-primary mx-auto mb-2" size={30} />
                  <h4 className="fw-bold mb-0">120h</h4>
                  <small className="text-muted">Content</small>
                </Card>
              </Col>
              <Col xs={6}>
                <Card className="border-0 shadow-sm rounded-4 p-4 text-center">
                  <AiOutlineCheckCircle className="text-success mx-auto mb-2" size={30} />
                  <h4 className="fw-bold mb-0">12</h4>
                  <small className="text-muted">Units</small>
                </Card>
              </Col>
            </Row>

            <Card className="border-0 shadow-sm rounded-4 p-4 mb-4">
              <h6 className="fw-bold mb-4">Weekly Engagement</h6>
              <BarChart
                xAxis={[{ 
                  scaleType: 'band', 
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  label: 'Days of Week'
                }]}
                series={[{ 
                  data: [12, 19, 15, 22, 18, 25, 20],
                  color: '#0d6efd'
                }]}
                height={220}
                margin={{ left: 30, right: 20, top: 10, bottom: 30 }}
              />
            </Card>
            <Card className="bg-dark text-white border-0 rounded-4 p-4">
               <h6 className="text-warning fw-bold"><FiTrendingUp className="me-2"/> Smart Goal</h6>
               <p className="small mb-0 opacity-75">Complete at least 2 modules this week to stay ahead of the placement schedule.</p>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

function CourseCard({ title, hours, progress, status, icon, notesUrl, questionsUrl, category }) {
  const isComplete = status === "Completed";
  
  return (
    <Card className="border-0 shadow-sm rounded-4 p-3 course-card-hover" style={{ borderLeft: isComplete ? '6px solid #198754' : '6px solid #0d6efd' }}>
      <div className="d-flex align-items-center gap-3">
        <div className="rounded-4 p-3 d-none d-sm-flex align-items-center justify-content-center flex-shrink-0" 
             style={{ backgroundColor: '#f0f4ff', color: '#0d6efd', fontSize: '24px' }}>
          {icon}
        </div>
        
        <div className="flex-grow-1 overflow-hidden">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <div>
              <Badge bg="light" text="dark" className="border mb-1" style={{ fontSize: '9px' }}>{category}</Badge>
              <h6 className="fw-bold text-dark mb-1 text-truncate">{title}</h6>
              <small className="text-muted"><FiClock /> {hours} hours</small>
            </div>
            <Badge pill bg={isComplete ? "success" : "primary"} className="px-3 mt-3" style={{ fontSize: '9px' }}>{status}</Badge>
          </div>
          
          <ProgressBar now={progress} variant={isComplete ? "success" : "primary"} style={{ height: '6px' }} className="mb-3 rounded-pill" />

          <div className="d-flex gap-2">
            <Button size="sm" variant="primary" className="rounded-pill px-3 fw-bold" onClick={handleNotesOnClick}>
              <MdOutlinePlayCircle /> Notes
            </Button>
            <Button size="sm" variant="outline-secondary" className="rounded-pill px-3 fw-bold" onClick={handleMcqOnClick}>
              <FiBookOpen />MCQs
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}