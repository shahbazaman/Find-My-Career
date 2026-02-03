import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Form } from "react-bootstrap";
import { FaUserTie } from "react-icons/fa";
import "../css/Roles.css";
import axios from "axios";

export default function Roles() {
  const [search, setSearch] = useState("");
  const [rolesList, setRolesList] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get(
          "${import.meta.env.VITE_API_BASE_URL}/jobs/roles"
        );
        setRolesList(res.data);
      } catch (err) {
        console.error("Failed to load roles", err);
      }
    };

    fetchRoles();
  }, []);

  const filteredRoles = rolesList.filter((role) =>
    role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 fw-bold">Job Roles</h2>

      {/* Search bar */}
      <Form.Control
        type="text"
        placeholder="Search job role..."
        className="mb-4 search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Row>
        {filteredRoles.map((role, index) => (
          <Col key={index} md={4} sm={6} xs={12} className="mb-4">
            <Card className="role-card shadow-sm h-100">
              <div className="role-icon-box">
                <FaUserTie size={50} className="role-icon" />
              </div>
              <Card.Body>
                <Card.Title className="text-center fw-semibold">
                  {role}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
