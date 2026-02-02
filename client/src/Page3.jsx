import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsRobot } from "react-icons/bs";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Page3 = () => {
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const slides = [
    {
      role: "Software Engineer",
      company: "Tesla",
      color: "linear-gradient(135deg, #0ce16d 0%, #00b894 100%)",
      icon: "💻",
      description: "Master coding interviews"
    },
    {
      role: "Data Scientist",
      company: "Meta",
      color: "linear-gradient(135deg, #7f00ff 0%, #5b00d6 100%)",
      icon: "📊",
      description: "Ace data analysis questions"
    },
    {
      role: "UI/UX Designer",
      company: "Apple",
      color: "linear-gradient(135deg, #ff005a 0%, #d6004a 100%)",
      icon: "🎨",
      description: "Perfect your design portfolio"
    },
  ];

  const next = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIndex((index + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prev = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setIndex((index - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const navigate = useNavigate();
  const navigateToJobPrep = () => {
    navigate('/jobPrep');
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
      padding: "40px 15px",
      display: "flex",
      alignItems: "center"
    }}>
      <Container fluid className="px-3">
        <Row className="justify-content-center align-items-center g-5">
          {/* LEFT CONTENT */}
          <Col xs={12} lg={6} className="text-center text-lg-start">
            <div style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-50px)",
              transition: "all 0.8s ease-out"
            }}>
              {/* AI Badge */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.2)",
                backdropFilter: "blur(10px)",
                padding: "10px 20px",
                borderRadius: "30px",
                color: "white",
                fontSize: "clamp(12px, 2vw, 14px)",
                fontWeight: "600",
                marginBottom: "25px",
                border: "2px solid rgba(255,255,255,0.3)",
                boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
              }}>
                <BsRobot size={20} />
                Learn With AI
              </div>

              {/* Main Heading */}
              <h1 style={{
                fontSize: "clamp(32px, 8vw, 64px)",
                fontWeight: "900",
                color: "white",
                marginBottom: "20px",
                textShadow: "3px 3px 6px rgba(0,0,0,0.3)",
                lineHeight: "1.1"
              }}>
                Job Prep
              </h1>

              {/* Subheading */}
              <h4 style={{
                fontSize: "clamp(16px, 3vw, 24px)",
                color: "rgba(255,255,255,0.95)",
                marginBottom: "35px",
                fontWeight: "500",
                lineHeight: "1.6"
              }}>
                Practice interviews with AI <br />
                <span style={{ fontWeight: "700" }}>Interview Coach</span>
              </h4>

              {/* CTA Button */}
              <Button
                variant="light"
                size="lg"
                style={{
                  color: "#667eea",
                  border: "none",
                  padding: "16px 40px",
                  fontSize: "clamp(14px, 2.5vw, 16px)",
                  fontWeight: "700",
                  borderRadius: "50px",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  maxWidth: "215px"
                }}
                onClick={navigateToJobPrep}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.3)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                }}
              >
                View all Preps
                <span style={{ fontSize: "20px" }}>→</span>
              </Button>

              {/* Stats - Responsive Flex */}
              <div style={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "20px",
                marginTop: "50px",
                // justifyContent: "center",
                flexWrap: "wrap"
              }}>
                {[
                  { num: "500+", label: "Interview Questions" },
                  { num: "95%", label: "Success Rate" },
                  { num: "24/7", label: "AI Support" }
                ].map((stat, i) => (
                  <div key={i} style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.8s ease-out ${i * 0.2}s`,
                    textAlign: "center"
                  }}>
                    <div style={{
                      fontSize: "clamp(24px, 6vw, 32px)",
                      fontWeight: "900",
                      color: "white",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
                    }}>
                      {stat.num}
                    </div>
                    <div style={{
                      fontSize: "clamp(12px, 2vw, 14px)",
                      color: "rgba(255,255,255,0.85)",
                      fontWeight: "500"
                    }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>

          {/* RIGHT SLIDER */}
          <Col xs={12} lg={6} className="position-relative">
            <div style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(50px)",
              transition: "all 0.8s ease-out 0.2s",
              height: "clamp(350px, 50vh, 450px)"
            }}>
              {/* Navigation Buttons - Responsive Positioning */}
              <Button
             variant="light"
             size="sm"
             className="position-absolute start-0 translate-middle-y me-3"
             style={{
               width: "50px",
               height: "50px",
               borderRadius: "50%",
               zIndex: 100,
               color: "#667eea",
               fontSize: "24px",
               cursor: isAnimating ? "not-allowed" : "pointer",
               boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
               transition: "all 0.3s ease",
               opacity: isAnimating ? 0.5 : 1,
               display: "flex !important",
               alignItems: "center",
               justifyContent: "center",backgroundColor:"white"
             }}
             onClick={prev}
             disabled={isAnimating}
             onMouseOver={(e) => {
               if (!isAnimating) {
               e.target.style.transform = "scale(1.1)";
               // e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
              }
             }}
             onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
              // e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
             }}
              >
               <FaArrowCircleLeft />
              </Button>
              {/* Cards Container */}
              <div style={{
                position: "relative",
                width: "100%",
                maxWidth: "clamp(300px, 80vw, 350px)",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {slides.map((slide, i) => {
                  const offset = (i - index + slides.length) % slides.length;
                  const isActive = i === index;
                  
                  return (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        transform: `
                          translateX(${offset * 100}%) 
                          scale(${isActive ? 1 : 0.85}) 
                          rotateY(${offset * 15}deg)
                        `,
                        opacity: isActive ? 1 : 0.4,
                        transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
                        zIndex: isActive ? 10 : 1,
                        pointerEvents: isActive ? "auto" : "none",
                        filter: isActive ? "blur(0px)" : "blur(2px)"
                      }}
                    >
                      <div style={{
                        width: "100%",
                        height: "100%",
                        background: slide.color,
                        borderRadius: "30px",
                        padding: "clamp(20px, 5vw, 40px)",
                        boxShadow: isActive 
                          ? "0 20px 60px rgba(0,0,0,0.4)" 
                          : "0 10px 30px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        color: "white",
                        position: "relative",
                        overflow: "hidden"
                      }}>
                        {/* Decorative circles */}
                        <div style={{
                          position: "absolute",
                          top: "-50px",
                          right: "-50px",
                          width: "150px",
                          height: "150px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(10px)"
                        }} />
                        <div style={{
                          position: "absolute",
                          bottom: "-30px",
                          left: "-30px",
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          background: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(10px)"
                        }} />

                        <div style={{ position: "relative", zIndex: 2 }}>
                          {/* Icon */}
                          <div style={{
                            fontSize: "clamp(48px, 12vw, 72px)",
                            marginBottom: "20px",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
                          }}>
                            {slide.icon}
                          </div>

                          {/* Role */}
                          <h3 style={{
                            fontSize: "clamp(24px, 6vw, 32px)",
                            fontWeight: "800",
                            marginBottom: "10px",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.2)"
                          }}>
                            {slide.role}
                          </h3>

                          {/* Company */}
                          <p style={{
                            fontSize: "clamp(16px, 4vw, 20px)",
                            fontWeight: "600",
                            marginBottom: "15px",
                            opacity: 0.95
                          }}>
                            {slide.company}
                          </p>

                          {/* Description */}
                          <p style={{
                            fontSize: "clamp(14px, 3vw, 16px)",
                            opacity: 0.9,
                            fontWeight: "500",
                            marginBottom: "30px"
                          }}>
                            {slide.description}
                          </p>
                        </div>

                        {/* Button */}
                        <Button
                          variant="light"
                          size="sm"
                          style={{
                            color: "#333",
                            border: "none",
                            padding: "14px 30px",
                            fontSize: "clamp(13px, 2.5vw, 15px)",
                            fontWeight: "700",
                            borderRadius: "50px",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                            transition: "all 0.3s ease",
                            position: "relative",
                            zIndex: 2,
                            width: "100%"
                          }}
                          onClick={navigateToJobPrep}
                          onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.05)";
                            e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
                          }}
                        >
                          Practice Interview →
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Button */}
              <Button
                variant="light"
                size="sm"
                className="position-absolute end-0 translate-middle-y ms-3"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",zIndex: 100,
                  color: "#667eea",
                  fontSize: "24px",
                  cursor: isAnimating ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  opacity: isAnimating ? 0.2 : 1,
                  display: "flex !important",
                  alignItems: "center",
                  justifyContent: "center",backgroundColor:"white"
                }}
                onClick={next}
                disabled={isAnimating}
                onMouseOver={(e) => {
                  if (!isAnimating) {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
                  }
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
                }}
              >
                <FaArrowCircleRight />
              </Button>

              {/* Dots Indicator - Responsive */}
              <div style={{
                position: "absolute",
                bottom: "-60px",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: "10px",
                justifyContent: "center"
              }}>
                {slides.map((_, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setIndex(i);
                        setTimeout(() => setIsAnimating(false), 500);
                      }
                    }}
                    style={{
                      width: i === index ? "30px" : "10px",
                      height: "10px",
                      borderRadius: "5px",
                      background: i === index ? "white" : "rgba(255,255,255,0.4)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: i === index ? "0 2px 8px rgba(0,0,0,0.3)" : "none"
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
