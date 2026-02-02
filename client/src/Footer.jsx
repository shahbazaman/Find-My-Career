import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="gy-4">
          {/* Newsletter */}
          <Col md={4}>
            <h5 className="footer-title">Subscribe to Find My Career</h5>
            <p className="footer-text">
              Get latest job openings, hiring alerts, and career tips directly
              in your inbox.
            </p>
            <Button className="subscribe-btn">Subscribe now</Button>
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
            <p className="copyright">
              © 2025 Find My Career. All rights reserved.
            </p>
          </Col>

          <Col md={6} className="text-md-end">
            <div className="social-icons">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
