import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Page6() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [appliedJobs, setAppliedJobs] = useState([]);
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/applications/my", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
       setAppliedJobs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load applications");
      }
    };

    fetchApplications();
  }, []);

  const safeJobs = Array.isArray(appliedJobs) ? appliedJobs : [];
  const safeAppliedJobs = Array.isArray(appliedJobs) ? appliedJobs : [];

  const countStatus = {
    Applied: safeJobs.filter((job) => job.status === "Applied").length,
    Interview: safeJobs.filter((job) => job.status === "Interview").length,
    Offer: safeJobs.filter((job) => job.status === "Offer").length,
    Rejected: safeJobs.filter((job) => job.status === "Rejected").length,
  };

  const chartData = [
    { name: "Applied", value: countStatus.Applied, color: "#3b82f6" },
    { name: "Interview", value: countStatus.Interview, color: "#f59e0b" },
    { name: "Rejected", value: countStatus.Rejected, color: "#ef4444" },
    { name: "Offer", value: countStatus.Offer, color: "#10b981" },
  ];

  const statusColors = {
    Applied: "#3b82f6",
    Interview: "#f59e0b",
    Rejected: "#ef4444",
    Offer: "#10b981",
  };

  const stats = [
    {
      label: "Total Applications",
      value: appliedJobs.length,
      icon: "📊",
      color: "#667eea",
    },
    {
      label: "Interviews",
      value: countStatus.Interview,
      icon: "💼",
      color: "#f59e0b",
    },
    {
      label: "Offers Received",
      value: countStatus.Offer,
      icon: "🎉",
      color: "#10b981",
    },
    {
      label: "In Progress",
      value: countStatus.Applied,
      icon: "⏳",
      color: "#3b82f6",
    },
  ];

  // Responsive Donut Chart Component
  const DonutChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -90;
    const totalApplications = safeJobs.length;

    if (totalApplications === 0) {
      return <p>No applications yet</p>;
    }

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
          width: "100%",
        }}
      >
        <svg
          width="100%"
          height="300"
          viewBox="0 0 300 300"
          style={{ maxWidth: "300px" }}
        >
          <g transform="translate(150, 150)">
            {data.map((item, index) => {
              if (total === 0) return null;
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;

              const startX = 90 * Math.cos((Math.PI * startAngle) / 180);
              const startY = 90 * Math.sin((Math.PI * startAngle) / 180);
              const endX = 90 * Math.cos((Math.PI * endAngle) / 180);
              const endY = 90 * Math.sin((Math.PI * endAngle) / 180);

              const largeArc = angle > 180 ? 1 : 0;

              const pathData = [
                `M ${startX} ${startY}`,
                `A 90 90 0 ${largeArc} 1 ${endX} ${endY}`,
                `L ${endX * 0.6} ${endY * 0.6}`,
                `A 54 54 0 ${largeArc} 0 ${startX * 0.6} ${startY * 0.6}`,
                "Z",
              ].join(" ");

              currentAngle = endAngle;

              return (
                <g key={index}>
                  <path
                    d={pathData}
                    fill={item.color}
                    style={{
                      opacity: 0,
                      animation: `fadeIn 0.6s ease-out ${index * 0.15}s forwards`,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.opacity = "0.8";
                      e.target.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.opacity = "1";
                      e.target.style.transform = "scale(1)";
                    }}
                  />
                  {percentage > 5 && (
                    <text
                      x={
                        72 *
                        Math.cos(
                          (Math.PI * (startAngle + angle / 2)) / 180
                        )
                      }
                      y={
                        72 *
                        Math.sin(
                          (Math.PI * (startAngle + angle / 2)) / 180
                        )
                      }
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="18"
                      fontWeight="700"
                      style={{
                        opacity: 0,
                        animation: `fadeIn 0.6s ease-out ${
                          index * 0.15 + 0.3
                        }s forwards`,
                      }}
                    >
                      {item.value}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Center circle with total */}
            <circle r="50" fill="white" />
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="32"
              fontWeight="800"
              fill="#667eea"
            >
              {total}
            </text>
            <text
              y="22"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="13"
              fontWeight="600"
              fill="#6c757d"
            >
              Total
            </text>
          </g>
        </svg>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>

        {/* Responsive Legend */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                background: `${item.color}15`,
                borderRadius: "20px",
                border: `2px solid ${item.color}30`,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.borderColor = item.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.borderColor = `${item.color}30`;
              }}
            >
              <div
                style={{
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  background: item.color,
                }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#495057",
                }}
              >
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #060729ff 0%, #0c248dff 100%)",
        padding: "clamp(20px, 3vw, 40px)",
      }}
    >
      <Container fluid style={{ maxWidth: "1600px", padding: "40px 20px" }}>
        <Row className="justify-content-center">
          <Col xs={12}>
            <div
              style={{
                transform: `translateY(${Math.min(scrollY * 0.3, 50)}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              {/* Header */}
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "50px",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(-30px)",
                  transition: "all 0.8s ease-out",
                }}
              >
                <h1
                  style={{
                    color: "white",
                    fontSize: "clamp(28px, 5vw, 48px)",
                    fontWeight: "800",
                    marginBottom: "15px",
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  }}
                >
                  📈 Application Dashboard
                </h1>
                <p
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontSize: "clamp(14px, 2vw, 18px)",
                    fontWeight: "500",
                  }}
                >
                  Track your job applications and interview progress
                </p>
              </div>

              {/* Stats Cards - Full Width Grid */}
              <Row className="g-4 mb-5">
                {stats.map((stat, index) => (
                  <Col xs={12} sm={6} lg={3} key={index}>
                    <div
                      style={{
                        background: "white",
                        borderRadius: "20px",
                        padding: "30px",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible
                          ? "translateY(0)"
                          : "translateY(30px)",
                        transition: `all 0.6s ease-out ${index * 0.1}s`,
                        cursor: "pointer",
                        height: "100%",
                        minHeight: "140px",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-8px)";
                        e.currentTarget.style.boxShadow =
                          "0 15px 40px rgba(0,0,0,0.25)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow =
                          "0 10px 30px rgba(0,0,0,0.15)";
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div>
                          <p
                            style={{
                              color: "#6c757d",
                              fontSize: "14px",
                              margin: "0 0 12px 0",
                              fontWeight: "600",
                            }}
                          >
                            {stat.label}
                          </p>
                          <h2
                            style={{
                              color: stat.color,
                              fontSize: "clamp(32px, 5vw, 42px)",
                              fontWeight: "800",
                              margin: 0,
                              textShadow:
                                "1px 1px 2px rgba(0,0,0,0.1)",
                            }}
                          >
                            {stat.value}
                          </h2>
                        </div>
                        <div style={{ fontSize: "48px" }}>{stat.icon}</div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>

              {/* Main Content - Wide Table Layout */}
              <Row className="g-4">
                {/* Table Section - Takes More Width */}
                <Col xs={12} xl={8}>
                  <div
                    style={{
                      background: "white",
                      borderRadius: "20px",
                      padding: "35px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateX(0)"
                        : "translateX(-50px)",
                      transition: "all 0.8s ease-out 0.3s",
                      overflow: "hidden",
                    }}
                  >
                    <h2
                      style={{
                        color: "#667eea",
                        fontSize: "clamp(22px, 3vw, 28px)",
                        fontWeight: "700",
                        marginBottom: "25px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      📋 Recent Applications
                    </h2>

                    <div
                      style={{
                        maxHeight: "600px",
                        overflowY: "auto",
                        overflowX: "auto",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef",
                      }}
                    >
                      <table
                        style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          minWidth: "600px",
                        }}
                      >
                        <thead
                          style={{
                            background:
                              "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            position: "sticky",
                            top: 0,
                            zIndex: 10,
                          }}
                        >
                          <tr>
                            <th
                              style={{
                                padding: "18px 20px",
                                textAlign: "left",
                                color: "white",
                                fontWeight: "600",
                                fontSize: "15px",
                                width: "25%",
                              }}
                            >
                              Company
                            </th>
                            <th
                              style={{
                                padding: "18px 20px",
                                textAlign: "left",
                                color: "white",
                                fontWeight: "600",
                                fontSize: "15px",
                                width: "35%",
                              }}
                            >
                              Role
                            </th>
                            <th
                              style={{
                                padding: "18px 20px",
                                textAlign: "left",
                                color: "white",
                                fontWeight: "600",
                                fontSize: "15px",
                                width: "22%",
                              }}
                            >
                              Applied Date
                            </th>
                            <th
                              style={{
                                padding: "18px 20px",
                                textAlign: "center",
                                color: "white",
                                fontWeight: "600",
                                fontSize: "15px",
                                width: "18%",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {safeJobs.map((job, index) => (
                            <tr
                              key={index}
                              style={{
                                borderBottom: "1px solid #f1f3f5",
                                transition: "all 0.3s ease",
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.background =
                                  "#f8f9fa";
                                e.currentTarget.style.transform =
                                  "scale(1.01)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.background = "white";
                                e.currentTarget.style.transform =
                                  "scale(1)";
                              }}
                            >
                              <td
                                style={{
                                  padding: "20px",
                                  fontWeight: "700",
                                  color: "#495057",
                                  fontSize: "15px",
                                }}
                              >
                                {job.company || "-"}
                              </td>
                              <td
                                style={{
                                  padding: "20px",
                                  color: "#6c757d",
                                  fontSize: "15px",
                                  fontWeight: "500",
                                }}
                              >
                                {job.role || "-"}
                              </td>
                              <td
                                style={{
                                  padding: "20px",
                                  color: "#6c757d",
                                  fontSize: "14px",
                                }}
                              >
                                {job.date || "-"}
                              </td>
                              <td
                                style={{
                                  padding: "20px",
                                  textAlign: "center",
                                }}
                              >
                                <span
                                  style={{
                                    padding: "8px 16px",
                                    borderRadius: "20px",
                                    fontSize: "13px",
                                    fontWeight: "600",
                                    color: "white",
                                    background:
                                      statusColors[job.status],
                                    display: "inline-block",
                                    boxShadow: `0 3px 10px ${statusColors[job.status]}40`,
                                    minWidth: "90px",
                                  }}
                                >
                                  {job.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Col>

                {/* Donut Chart Section - Takes Less Width */}
                <Col xs={12} xl={4}>
                  <div
                    style={{
                      background: "white",
                      borderRadius: "20px",
                      padding: "35px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateX(0)"
                        : "translateX(50px)",
                      transition: "all 0.8s ease-out 0.3s",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <h2
                      style={{
                        color: "#667eea",
                        fontSize: "clamp(22px, 3vw, 28px)",
                        fontWeight: "700",
                        marginBottom: "25px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        width: "100%",
                      }}
                    >
                      📊 Status Distribution
                    </h2>
                    <DonutChart data={chartData} />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
