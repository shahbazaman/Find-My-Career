import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsRobot } from "react-icons/bs";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Page3 = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const slides = [
    {
      role: "Software Engineer",
      company: "Tesla",
      color: "linear-gradient(145deg, #0ce16d 0%, #00b894 100%)",
      shadowColor: "rgba(12, 225, 109, 0.45)",
      icon: "💻",
      description: "Master coding interviews with AI-powered mock sessions",
    },
    {
      role: "Data Scientist",
      company: "Meta",
      color: "linear-gradient(145deg, #7f00ff 0%, #5b00d6 100%)",
      shadowColor: "rgba(127, 0, 255, 0.45)",
      icon: "📊",
      description: "Ace data analysis and ML system design questions",
    },
    {
      role: "UI/UX Designer",
      company: "Apple",
      color: "linear-gradient(145deg, #ff005a 0%, #d6004a 100%)",
      shadowColor: "rgba(255, 0, 90, 0.45)",
      icon: "🎨",
      description: "Perfect your design portfolio and case study answers",
    },
  ];

  const next = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIndex((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIndex((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goTo = (i) => {
    if (!isAnimating && i !== index) {
      setIsAnimating(true);
      setIndex(i);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  /* ── fade in/out only — no transform shift ── */
  const getCardStyle = (i) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: i === index ? 1 : 0,
    zIndex: i === index ? 10 : 1,
    transition: "opacity 0.5s ease-in-out",
    pointerEvents: i === index ? "auto" : "none",
  });

  /* ── shared arrow button style ── */
  const arrowStyle = (disabled) => ({
    width: "48px",
    height: "48px",
    flexShrink: 0,
    borderRadius: "50%",
    border: "none",
    background: "white",
    color: "#667eea",
    fontSize: "22px",
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
    opacity: disabled ? 0.4 : 1,
    transition: "all 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
        padding: "60px 15px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container fluid className="px-3">
        <Row className="justify-content-center align-items-center g-5">

          {/* ══════════ LEFT CONTENT ══════════ */}
          <Col xs={12} lg={6} className="text-center text-lg-start">
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(-50px)",
                transition: "all 0.8s ease-out",
              }}
            >
              {/* AI Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(12px)",
                  padding: "10px 22px",
                  borderRadius: "30px",
                  color: "white",
                  fontSize: "clamp(12px, 2vw, 14px)",
                  fontWeight: "600",
                  marginBottom: "28px",
                  border: "1.5px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}
              >
                <BsRobot size={20} />
                Learn With AI
              </div>

              {/* Heading */}
              <h1
                style={{
                  fontSize: "clamp(36px, 8vw, 68px)",
                  fontWeight: "900",
                  color: "white",
                  marginBottom: "18px",
                  textShadow: "3px 3px 8px rgba(0,0,0,0.35)",
                  lineHeight: "1.05",
                  letterSpacing: "-1px",
                }}
              >
                Job Prep
              </h1>

              {/* Sub-heading */}
              <h4
                style={{
                  fontSize: "clamp(15px, 3vw, 22px)",
                  color: "rgba(255,255,255,0.9)",
                  marginBottom: "36px",
                  fontWeight: "400",
                  lineHeight: "1.7",
                }}
              >
                Practice interviews with AI&nbsp;
                <span style={{ fontWeight: "700" }}>Interview Coach</span>
              </h4>

              {/* CTA */}
              <Button
                variant="light"
                size="lg"
                onClick={() => navigate("/jobPrep")}
                style={{
                  color: "#667eea",
                  border: "none",
                  padding: "15px 38px",
                  fontSize: "clamp(14px, 2.5vw, 16px)",
                  fontWeight: "700",
                  borderRadius: "50px",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.25)",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  maxWidth: "220px",
                  width: "100%",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.25)";
                }}
              >
                View all Preps <span style={{ fontSize: "20px" }}>→</span>
              </Button>

              {/* Stats */}
              <div
                style={{
                  display: "flex",
                  gap: "32px",
                  marginTop: "50px",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { num: "500+", label: "Interview Questions" },
                  { num: "95%", label: "Success Rate" },
                  { num: "24/7", label: "AI Support" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(20px)",
                      transition: `all 0.8s ease-out ${i * 0.2}s`,
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "clamp(26px, 6vw, 34px)",
                        fontWeight: "900",
                        color: "white",
                        textShadow: "2px 2px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      {stat.num}
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(11px, 2vw, 13px)",
                        color: "rgba(255,255,255,0.8)",
                        fontWeight: "500",
                        marginTop: "2px",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* ══════════ RIGHT SLIDER ══════════ */}
          <Col xs={12} lg={6}>
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(50px)",
                transition: "all 0.8s ease-out 0.2s",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "28px",
              }}
            >
              {/* Arrow ── Card stack ── Arrow row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  width: "100%",
                }}
              >
                {/* Prev arrow */}
                <button
                  onClick={prev}
                  disabled={isAnimating}
                  style={arrowStyle(isAnimating)}
                  onMouseOver={(e) => {
                    if (!isAnimating) e.currentTarget.style.transform = "scale(1.12)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <FaArrowCircleLeft />
                </button>

                {/* ── Card stack container — fixed height so button never hides ── */}
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "340px",
                    height: "440px",   /* fixed — prevents collapse */
                  }}
                >
                  {slides.map((slide, i) => (
                    <div key={i} style={getCardStyle(i)}>
                      {/* ── inner card — same fixed height, generous padding ── */}
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: slide.color,
                          borderRadius: "28px",
                          padding: "36px 32px 28px 32px",
                          boxShadow: `0 24px 60px ${slide.shadowColor}, 0 8px 24px rgba(0,0,0,0.25)`,
                          display: "flex",
                          flexDirection: "column",
                          color: "white",
                          position: "relative",
                          overflow: "hidden",
                          boxSizing: "border-box",
                        }}
                      >
                        {/* Decorative blobs */}
                        <div
                          style={{
                            position: "absolute",
                            top: "-45px",
                            right: "-45px",
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.12)",
                            pointerEvents: "none",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            bottom: "-30px",
                            left: "-30px",
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.10)",
                            pointerEvents: "none",
                          }}
                        />

                        {/* Content — flex-grow so button is always pushed to bottom */}
                        <div
                          style={{
                            position: "relative",
                            zIndex: 2,
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {/* Icon */}
                          <div style={{ fontSize: "58px", lineHeight: 1, marginBottom: "6px" }}>
                            {slide.icon}
                          </div>

                          {/* Role */}
                          <h3
                            style={{
                              fontSize: "clamp(22px, 5vw, 30px)",
                              fontWeight: "800",
                              margin: 0,
                              textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
                              lineHeight: 1.15,
                            }}
                          >
                            {slide.role}
                          </h3>

                          {/* Company */}
                          <p
                            style={{
                              fontSize: "clamp(15px, 3vw, 18px)",
                              fontWeight: "600",
                              margin: 0,
                              opacity: 0.92,
                            }}
                          >
                            @ {slide.company}
                          </p>

                          {/* Description */}
                          <p
                            style={{
                              fontSize: "clamp(13px, 2.5vw, 15px)",
                              opacity: 0.85,
                              fontWeight: "400",
                              margin: 0,
                              lineHeight: 1.65,
                            }}
                          >
                            {slide.description}
                          </p>
                        </div>

                        {/* Practice button ── always at bottom, never hidden ── */}
                        <button
                          onClick={() => navigate("/jobPrep")}
                          style={{
                            position: "relative",
                            zIndex: 2,
                            marginTop: "24px",
                            flexShrink: 0,
                            width: "100%",
                            padding: "15px 0",
                            background: "rgba(255,255,255,0.95)",
                            color: "#333",
                            border: "none",
                            borderRadius: "50px",
                            fontSize: "clamp(13px, 2.5vw, 15px)",
                            fontWeight: "700",
                            cursor: "pointer",
                            boxShadow: "0 4px 18px rgba(0,0,0,0.2)",
                            transition: "all 0.3s ease",
                            letterSpacing: "0.3px",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.04)";
                            e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.3)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,0.2)";
                          }}
                        >
                          Practice Interview →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Next arrow */}
                <button
                  onClick={next}
                  disabled={isAnimating}
                  style={arrowStyle(isAnimating)}
                  onMouseOver={(e) => {
                    if (!isAnimating) e.currentTarget.style.transform = "scale(1.12)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <FaArrowCircleRight />
                </button>
              </div>

              {/* Dot indicators */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
                {slides.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      width: i === index ? "28px" : "10px",
                      height: "10px",
                      borderRadius: "5px",
                      background: i === index ? "white" : "rgba(255,255,255,0.35)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: i === index ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Page3;