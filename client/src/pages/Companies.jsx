import React, { useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaBuilding } from "react-icons/fa";
import '../css/Companies.css'
import axios from "axios";
import { useEffect } from "react";

export default function Companies() {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
useEffect(() => {
  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/companies`);
      setCompanies(res.data);
    } catch (err) {
      console.error("Failed to load companies", err);
    }
  };

  fetchCompanies();
}, []);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 fw-bold">Top Companies</h2>

      {/* Search Bar */}
      <Form.Control
        type="text"
        placeholder="Search company..."
        className="mb-4 search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Row>
        {filteredCompanies.map((company, index) => (
          <Col key={index} md={4} sm={6} xs={12} className="mb-4">
            <Card className="company-card shadow-sm">
              <div className="logo-box">
                {company.logo ? (
                  <img src={company.logo} alt={company.name} className="company-logo" />
                ) : (
                  <FaBuilding size={50} />
                )}
              </div>
              <Card.Body>
                <Card.Title className="text-center fw-semibold">
                  {company.name}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
