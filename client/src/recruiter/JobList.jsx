import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { FaBriefcase, FaMapMarkerAlt, FaBuilding, FaTimes } from "react-icons/fa";

export default function JobList() {
  const [jobs, setJobs]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const titleFilter = searchParams.get("title") || "";
  const navigate    = useNavigate();

  /* ── fetch whenever titleFilter or search changes ── */
  useEffect(() => {
    setLoading(true);
    const params = {};
    if (titleFilter) params.title  = titleFilter;
    if (search)      params.search = search;

    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/jobs`, { params })
      .then((res) => setJobs(res.data.jobs || []))
      .catch((err) => console.error("JobList fetch error:", err))
      .finally(() => setLoading(false));
  }, [titleFilter, search]);

  /* ── clear the title filter and go back to all jobs ── */
  const clearFilter = () => {
    setSearchParams({});
  };

  return (
    <Container className="mt-4 mb-5">

      {/* ── Header ── */}
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <div>
          <h2 className="fw-bold mb-0">
            {titleFilter ? (
              <>
                Jobs for{" "}
                <span style={{ color: "#764ba2" }}>{titleFilter}</span>
              </>
            ) : (
              "All Jobs"
            )}
          </h2>
          {!loading && (
            <small className="text-muted">{jobs.length} job{jobs.length !== 1 ? "s" : ""} found</small>
          )}
        </div>

        {/* show a clear-filter pill when filtered by title */}
        {titleFilter && (
          <Button
            variant="outline-secondary"
            size="sm"
            className="rounded-pill d-flex align-items-center gap-2"
            onClick={clearFilter}
          >
            <FaTimes size={11} /> Clear filter
          </Button>
        )}
      </div>

      {/* ── Search bar (only shown when NOT filtering by title) ── */}
      {!titleFilter && (
        <Form.Control
          type="text"
          placeholder="Search by title, company, skills..."
          className="mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ borderRadius: "12px", padding: "12px 16px" }}
        />
      )}

      {/* ── Job Cards ── */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <FaBriefcase size={40} className="mb-3" />
          <p>No jobs found{titleFilter ? ` for "${titleFilter}"` : ""}.</p>
          {titleFilter && (
            <Button variant="primary" onClick={clearFilter}>
              View all jobs
            </Button>
          )}
        </div>
      ) : (
        <Row className="g-4">
          {jobs.map((job) => (
            <Col key={job._id} xs={12} md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "16px",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "";
                }}
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                <Card.Body className="p-4">
                  {/* Company name */}
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <FaBuilding style={{ color: "#764ba2" }} />
                    <small className="text-muted fw-semibold">
                      {job.companyName || "Company"}
                    </small>
                  </div>

                  {/* Job title */}
                  <h5 className="fw-bold mb-2">{job.jobTitle}</h5>

                  {/* Location */}
                  {job.location && (
                    <div className="d-flex align-items-center gap-1 text-muted mb-3">
                      <FaMapMarkerAlt size={12} />
                      <small>{job.location}</small>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="d-flex flex-wrap gap-2">
                    {job.jobType && (
                      <Badge
                        style={{
                          background: "#eff6ff",
                          color: "#3b82f6",
                          fontWeight: 500,
                          borderRadius: "8px",
                          padding: "5px 10px"
                        }}
                      >
                        {job.jobType}
                      </Badge>
                    )}
                    {job.experience && (
                      <Badge
                        style={{
                          background: "#f5f3ff",
                          color: "#764ba2",
                          fontWeight: 500,
                          borderRadius: "8px",
                          padding: "5px 10px"
                        }}
                      >
                        {job.experience}
                      </Badge>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}