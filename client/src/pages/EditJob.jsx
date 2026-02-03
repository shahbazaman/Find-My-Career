import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  BsUpload,
  BsCheckCircleFill,
  BsBriefcase,
  BsGeoAlt,
  BsCurrencyDollar,
  BsCalendar
} from "react-icons/bs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    jobType: "",
    location: "",
    workMode: "",
    salaryMin: "",
    salaryMax: "",
    experienceMin: "",
    experienceMax: "",
    deadline: "",
    description: "",
    requirements: "",
    benefits: ""
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  /* ================= FETCH JOB DETAILS ================= */
  useEffect(() => {
    if (!token || !jobId) return;

    const fetchJob = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const job = res.data;

        setFormData({
          companyName: job.companyName || "",
          jobTitle: job.jobTitle || "",
          jobType: job.jobType || "",
          location: job.location || "",
          workMode: job.workMode || "",
          salaryMin: job.salaryMin || "",
          salaryMax: job.salaryMax || "",
          experienceMin: job.experienceMin || "",
          experienceMax: job.experienceMax || "",
          deadline: job.deadline ? job.deadline.slice(0, 10) : "",
          description: job.description || "",
          requirements: job.requirements || "",
          benefits: Array.isArray(job.benefits) ? job.benefits.join(", ") : ""
        });

        setLoading(false);
      } catch (err) {
        toast.error("Failed to load job");
navigate("/recruiter");
      }
    };

    fetchJob();
  }, [jobId, token, navigate]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/jobs/${jobId}`,
        {
          ...formData,
          salaryMin: Number(formData.salaryMin) || 0,
          salaryMax: Number(formData.salaryMax) || 0,
          experienceMin: Number(formData.experienceMin) || 0,
          experienceMax: Number(formData.experienceMax) || 0,
          benefits: formData.benefits
            ? formData.benefits.split(",").map(b => b.trim())
            : []
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      toast.success("Job updated successfully");
navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job");
    }
  };

  if (loading) {
    return <p style={{ padding: 40, textAlign: "center" }}>Loading job...</p>;
  }

  return (
    <Container
      fluid
      className="px-3 py-5 min-vh-100 d-flex align-items-center"
      style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
    ><ToastContainer position="top-center" />
      <Row className="justify-content-center w-100">
        <Col xs={12} lg={10} xl={8}>
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                background: "white",
                borderRadius: "30px",
                padding: "40px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.3)"
              }}
            >
              <div className="text-center mb-5">
                <h1
                  style={{
                    fontWeight: 800,
                    background:
                      "linear-gradient(135deg,#667eea,#764ba2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Edit Job
                </h1>
              </div>

              {/* ================= FORM FIELDS ================= */}

              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Form.Control
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Control
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title"
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Job Type</option>
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                  </Form.Select>
                </Col>

                <Col md={6}>
                  <Form.Control
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Select
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Work Mode</option>
                    <option value="remote">Remote</option>
                    <option value="onsite">Onsite</option>
                    <option value="hybrid">Hybrid</option>
                  </Form.Select>
                </Col>

                <Col md={6}>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Row>

              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="salaryMin"
                    value={formData.salaryMin}
                    onChange={handleChange}
                    placeholder="Salary Min"
                  />
                </Col>

                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="salaryMax"
                    value={formData.salaryMax}
                    onChange={handleChange}
                    placeholder="Salary Max"
                  />
                </Col>
              </Row>

              <Row className="g-4 mb-4">
                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="experienceMin"
                    value={formData.experienceMin}
                    onChange={handleChange}
                    placeholder="Experience Min"
                  />
                </Col>

                <Col md={6}>
                  <Form.Control
                    type="number"
                    name="experienceMax"
                    value={formData.experienceMax}
                    onChange={handleChange}
                    placeholder="Experience Max"
                  />
                </Col>
              </Row>

              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Job Description"
                required
                className="mb-3"
              />

              <Form.Control
                as="textarea"
                rows={3}
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="Requirements"
                className="mb-3"
              />

              <Form.Control
                as="textarea"
                rows={3}
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="Benefits (comma separated)"
                className="mb-4"
              />

              {/* ================= SUBMIT ================= */}
              <Button
                type="submit"
                className="w-100 p-3"
                style={{
                  background:
                    "linear-gradient(135deg,#667eea,#764ba2)",
                  border: "none",
                  fontWeight: 700
                }}
              >
                <BsCheckCircleFill size={20} /> Update Job
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditJob;
