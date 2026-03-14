import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="gy-4">
          {/* Newsletter */}
          <Col md={4}>
            <h5 className="footer-title">Follow Find My Career</h5>
            <p className="footer-text">
              Get latest job openings, hiring alerts, and career tips directly
              in your inbox.
            </p>
            <div className="social-icons d-flex">
  <a href="https://www.facebook.com/findmycareercom/" target="_blank" rel="noopener noreferrer" className="social-link">
    <FaFacebookF />
  </a>
  <a href="https://www.instagram.com/findmycareeritb?igsh=YWw2eTNnZDR1a25v" target="_blank" rel="noopener noreferrer" className="social-link">
    <FaInstagram />
  </a>
  <a href="https://linkedin.com/in/shahbazaman" target="_blank" rel="noopener noreferrer" className="social-link">
    <FaLinkedinIn />
  </a>
  <a href="mailto:shahbazaman2003@gmail.com" className="social-link">
    <FaEnvelope />
  </a>
  <a href="tel:9567194946" className="social-link">
    <FaPhone />
  </a>
</div>
<div style={{marginTop:"5px"}}>
  <p><FaEnvelope /> : admin@findmycareer.com</p>
  <p><FaPhone /> : 9567194946</p>
</div>
          </Col>

          {/* Getting Started */}
          <Col md={2}>
            <h6 className="footer-heading">Getting Started</h6>
            <ul className="footer-list">
              <li>How it works</li>
              <li>Create Profile</li>
              <li>Upload Resume</li>
              <li>Job Alerts</li>
              <li>API Access</li>
            </ul>
          </Col>

          {/* Platform */}
          <Col md={2}>
            <h6 className="footer-heading">Platform</h6>
            <ul className="footer-list">
              <li>Browse Jobs</li>
              <li>Companies</li>
              <li>Career Guidance</li>
              <li>Skill Assessment</li>
            </ul>
          </Col>

          {/* Company */}
          <Col md={2}>
            <h6 className="footer-heading">Company</h6>
            <ul className="footer-list">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </Col>

          {/* Legal */}
          <Col md={2}>
            <h6 className="footer-heading">Legal</h6>
            <ul className="footer-list">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookies Policy</li>
              <li>Data Protection</li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider" />

        {/* Bottom */}
        <Row className="align-items-center">
          <Col md={6}>
            <p className="copyright text-center">
              © 2025 Find My Career. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
