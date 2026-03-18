import React, { useState, useEffect } from "react";
import {
  Card, Container, Row, Col, Form,
  Modal, Badge, Spinner
} from "react-bootstrap";
import {
  FaBuilding, FaEnvelope, FaMapMarkerAlt, FaIndustry,
  FaGlobe, FaUsers, FaCalendarAlt, FaUser
} from "react-icons/fa";
import "../css/Companies.css";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Companies() {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const filteredCompanies = companies.filter((c) =>
    c.name?.toLowerCase().includes(search.toLowerCase())
  );
  const [searchParams] = useSearchParams();

useEffect(() => {
  const companyName = searchParams.get("company");
  if (companyName && companies.length > 0) {
    const found = companies.find(
      (c) => c.name?.toLowerCase() === companyName.toLowerCase()
    );
    if (found) handleCardClick(found);
  }
}, [companies]);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/companies`);
        setCompanies(res.data);
      } catch (err) {
        console.error("Failed to load companies", err);
      }
    };
    fetchCompanies();
  }, []);

  const handleCardClick = async (company) => {
    setSelectedCompany(company);
    setModalData(null);
    setShowModal(true);

    // Guard: if no valid owner id, skip extra API calls
    const ownerId = company.owner;
    if (!ownerId || ownerId === "null" || ownerId === "undefined") {
      setModalData({ user: null, profile: null });
      return;
    }

    setModalLoading(true);
    try {
      const [userRes, profileRes] = await Promise.allSettled([
        axios.get(`${BASE_URL}/users/${ownerId}`),
        axios.get(`${BASE_URL}/company-profiles/user/${ownerId}`)
      ]);

      const user =
        userRes.status === "fulfilled" ? userRes.value.data : null;
      const profile =
        profileRes.status === "fulfilled" ? profileRes.value.data : null;

      setModalData({ user, profile });
    } catch (err) {
      console.error("Failed to load company details", err);
      setModalData({ user: null, profile: null });
    } finally {
      setModalLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedCompany(null);
    setModalData(null);
    setModalLoading(false);
  };

  // Returns first truthy value from the list
  const pick = (...values) =>
    values.find((v) => v !== null && v !== undefined && String(v).trim() !== "");

  const InfoRow = ({ icon, label, value }) => {
    if (!value) return null;
    return (
      <div style={styles.infoRow}>
        <span style={styles.infoIcon}>{icon}</span>
        <div>
          <div style={styles.infoLabel}>{label}</div>
          <div style={styles.infoValue}>{value}</div>
        </div>
      </div>
    );
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 fw-bold">Top Companies</h2>

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
            <Card
              className="company-card shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() => handleCardClick(company)}
            >
              <div className="logo-box">
                {company.logo ? (
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="company-logo"
                  />
                ) : (
                  <FaBuilding size={50} />
                )}
              </div>
              <Card.Body>
                <Card.Title className="text-center fw-semibold">
                  {company.name}
                </Card.Title>
                {company.industry && (
                  <p className="text-center text-muted small mb-0">
                    {company.industry}
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* ===================== COMPANY MODAL ===================== */}
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        size="lg"
        contentClassName="border-0"
        dialogClassName="modal-dialog-centered"
      >
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title style={{ fontWeight: 700, color: "#111" }}>
            Company Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={styles.modalBody}>
          {!selectedCompany || modalLoading ? (
            <div style={styles.loadingBox}>
              <Spinner animation="border" style={{ color: "#f40076" }} />
            </div>
          ) : (
            <>
              {/* ── TOP SECTION: logo + name + badge ── */}
              <div style={styles.topSection}>
                <div style={styles.logoWrapper}>
                  {pick(selectedCompany.logo, modalData?.profile?.logo) ? (
                    <img
                      src={pick(selectedCompany.logo, modalData?.profile?.logo)}
                      alt={selectedCompany.name}
                      style={styles.modalLogo}
                    />
                  ) : (
                    <div style={styles.logoFallback}>
                      <FaBuilding size={40} color="#aaa" />
                    </div>
                  )}
                </div>

                <div style={styles.nameBlock}>
                  <h4 style={styles.companyName}>
                    {pick(selectedCompany.name, modalData?.profile?.companyName)}
                  </h4>

                  {modalData?.user?.firstName && (
                    <p style={styles.recruiterName}>
                      <FaUser size={12} style={{ marginRight: 5, color: "#888" }} />
                      {modalData.user.firstName} {modalData.user.lastName}
                    </p>
                  )}

                  <Badge
                    style={{
                      background: selectedCompany.isHiring
                        ? "linear-gradient(90deg,#22c55e,#16a34a)"
                        : "#e5e7eb",
                      color: selectedCompany.isHiring ? "#fff" : "#555",
                      fontSize: "12px",
                      padding: "5px 12px",
                      borderRadius: "20px",
                      fontWeight: 600,
                      width: "fit-content"
                    }}
                  >
                    {selectedCompany.isHiring ? "🟢 Actively Hiring" : "⚪ Not Hiring"}
                  </Badge>
                </div>
              </div>

              <hr style={{ margin: "18px 0", borderColor: "#f0f0f0" }} />

              {/* ── INFO GRID ── */}
              <div style={styles.infoGrid}>
                <InfoRow
                  icon={<FaIndustry size={15} color="#f40076" />}
                  label="Industry"
                  value={pick(
                    selectedCompany.industry,
                    modalData?.profile?.industry
                  )}
                />
                <InfoRow
                  icon={<FaMapMarkerAlt size={15} color="#f40076" />}
                  label="Headquarters"
                  value={pick(
                    selectedCompany.headquarters,
                    modalData?.profile?.location
                  )}
                />
                <InfoRow
                  icon={<FaEnvelope size={15} color="#f40076" />}
                  label="Email"
                  value={pick(
                    modalData?.profile?.email,
                    modalData?.user?.email
                  )}
                />
                <InfoRow
                  icon={<FaUsers size={15} color="#f40076" />}
                  label="Company Size"
                  value={selectedCompany.companySize}
                />
                <InfoRow
                  icon={<FaCalendarAlt size={15} color="#f40076" />}
                  label="Founded"
                  value={
                    selectedCompany.foundedYear
                      ? String(selectedCompany.foundedYear)
                      : null
                  }
                />
                {pick(selectedCompany.website) && (
                  <div style={styles.infoRow}>
                    <span style={styles.infoIcon}>
                      <FaGlobe size={15} color="#f40076" />
                    </span>
                    <div>
                      <div style={styles.infoLabel}>Website</div>
                      <a
                        href={selectedCompany.website}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          color: "#f40076",
                          fontSize: "14px",
                          fontWeight: 500,
                          wordBreak: "break-all"
                        }}
                      >
                        {selectedCompany.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* ── DESCRIPTION ── */}
              {pick(
                selectedCompany.description,
                modalData?.profile?.description
              ) && (
                <>
                  <hr style={{ margin: "18px 0", borderColor: "#f0f0f0" }} />
                  <div>
                    <p style={styles.descLabel}>About</p>
                    <p style={styles.descText}>
                      {pick(
                        selectedCompany.description,
                        modalData?.profile?.description
                      )}
                    </p>
                  </div>
                </>
              )}

              {/* ── FALLBACK MESSAGE if no details filled ── */}
              {!pick(
                selectedCompany.industry,
                selectedCompany.headquarters,
                selectedCompany.companySize,
                selectedCompany.foundedYear,
                selectedCompany.website,
                selectedCompany.description,
                modalData?.profile?.email,
                modalData?.profile?.location,
                modalData?.profile?.description
              ) && (
                <p
                  style={{
                    color: "#aaa",
                    fontSize: "14px",
                    textAlign: "center",
                    marginTop: "10px"
                  }}
                >
                  No additional details available for this company yet.
                </p>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

const styles = {
  modalHeader: {
    borderBottom: "1px solid #f0f0f0",
    padding: "20px 24px 16px"
  },
  modalBody: {
  padding: "24px",
  maxHeight: "65vh",
  overflowY: "auto"
},
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "180px"
  },
  topSection: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap"
  },
  logoWrapper: {
    flexShrink: 0
  },
  modalLogo: {
  width: "80px",
  height: "80px",
  borderRadius: "14px",
  objectFit: "contain",    
  border: "1px solid #eee",
  padding: "6px",           
  background: "#fafafa"      
},
  logoFallback: {
    width: "80px",
    height: "80px",
    borderRadius: "14px",
    background: "#f4f4f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  nameBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  companyName: {
    fontWeight: 700,
    fontSize: "1.3rem",
    margin: 0,
    color: "#111"
  },
  recruiterName: {
    margin: 0,
    fontSize: "13px",
    color: "#666"
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "18px"
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px"
  },
  infoIcon: {
    marginTop: "2px",
    flexShrink: 0
  },
  infoLabel: {
    fontSize: "11px",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "2px"
  },
  infoValue: {
    fontSize: "14px",
    fontWeight: 500,
    color: "#222"
  },
  descLabel: {
    fontSize: "11px",
    color: "#999",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "8px",
    fontWeight: 600
  },
  descText: {
    fontSize: "14px",
    color: "#444",
    lineHeight: "1.7",
    margin: 0
  }
};