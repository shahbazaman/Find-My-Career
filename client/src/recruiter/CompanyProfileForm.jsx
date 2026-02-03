import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import {
  BsUpload,
  BsGeoAlt,
  BsEnvelope,
  BsCheckCircleFill
} from "react-icons/bs";

/* ================= CONFIG ================= */
const API_URL = "${import.meta.env.VITE_API_BASE_URL}/companies/me/profile";

export default function CompanyProfileForm() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    companyName: "",
    email: "",
    location: "",
    industry: "",
    description: "",
    logo: ""
  });

  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH EXISTING PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return setInitialLoading(false);

      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setForm({
          companyName: res.data.companyName || "",
          email: res.data.email || "",
          location: res.data.location || "",
          industry: res.data.industry || "",
          description: res.data.description || "",
          logo: res.data.logo || ""
        });

        setLogoPreview(res.data.logo || "");
      } catch (err) {
        // profile may not exist yet → safe to ignore
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  /* ================= INPUT HANDLERS ================= */
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= LOGO UPLOAD (FRONTEND) ================= */
  const handleLogoUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
      setForm(prev => ({ ...prev, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async e => {
    e.preventDefault();

    if (!token) {
      alert("Please login again");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(API_URL, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      alert("Company profile saved successfully");
    } catch (err) {
      console.error("COMPANY PROFILE SAVE ERROR:", err);
      setError(err?.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center px-3"
      style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
    >
      <Row className="w-100 justify-content-center mt-5 mb-5">
        <Col xl={8} lg={9} md={11}>
          <Form onSubmit={handleSubmit}>
            <div
              style={{
                background: "white",
                borderRadius: 30,
                padding: "clamp(30px,5vw,40px)",
                boxShadow: "0 30px 70px rgba(0,0,0,.3)"
              }}
            >
              {/* HEADER */}
              <h2
                className="text-center fw-bold mb-4"
                style={{
                  background: "linear-gradient(135deg,#667eea,#764ba2)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Company Profile
              </h2>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <Row className="g-4">
                <Col md={6}>
                  <Form.Label>Company Name *</Form.Label>
                  <Form.Control
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    required
                  />
                </Col>

                <Col md={6}>
                  <Form.Label>Email *</Form.Label>
                  <div className="position-relative">
                    <BsEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                    <Form.Control
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="ps-5"
                      required
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <Form.Label>Location</Form.Label>
                  <div className="position-relative">
                    <BsGeoAlt className="position-absolute top-50 start-0 translate-middle-y ms-3" />
                    <Form.Control
                      name="location"
                      value={form.location}
                      onChange={handleChange}
                      className="ps-5"
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <Form.Label>Industry</Form.Label>
                  <Form.Control
                    name="industry"
                    value={form.industry}
                    onChange={handleChange}
                  />
                </Col>

                <Col xs={12}>
                  <Form.Label>Company Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </Col>

                {/* LOGO */}
                <Col xs={12}>
                  <Form.Label>Company Logo</Form.Label>
                  <label
                    className="w-100 text-center p-4"
                    style={{
                      border: "2px dashed #667eea",
                      borderRadius: 14,
                      cursor: "pointer"
                    }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleLogoUpload}
                    />
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="logo"
                        style={{ maxWidth: 160, borderRadius: 12 }}
                      />
                    ) : (
                      <>
                        <BsUpload size={36} color="#667eea" />
                        <p className="fw-semibold mt-2">
                          Upload Company Logo
                        </p>
                      </>
                    )}
                  </label>
                </Col>
              </Row>

              {/* SUBMIT */}
              <Button
                type="submit"
                className="w-100 mt-4 py-3 fw-bold"
                disabled={loading}
                style={{
                  background: "linear-gradient(135deg,#667eea,#764ba2)",
                  border: "none"
                }}
              >
                {loading ? "Saving..." : (
                  <>
                    <BsCheckCircleFill /> Save Company Profile
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
