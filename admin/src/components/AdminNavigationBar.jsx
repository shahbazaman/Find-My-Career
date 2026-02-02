import logo from "../../../client/src/assets/logo1.png";
import React, { useState } from "react";
import {BsSearch, BsBell, BsPerson, BsGear,BsMoon,BsSun,BsEnvelope,BsChevronDown} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const AdminNavigationBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const notifications = [
    { id: 1, title: "New Applicant", message: "INFOSYS applied for Recruiter approval", time: "2m ago", unread: true },
    { id: 2, title: "Reminder", message: "Meeting with Sarah at 3 PM", time: "1h ago", unread: true },
    { id: 3, title: "Job Posted", message: "Senior Frontend position is now live", time: "3h ago", unread: false },
  ];
  const unreadCount = notifications.filter(n => n.unread).length;
  return (
    <nav style={{
      height: "80px",
      background: "white",
      boxShadow: "0 2px 15px rgba(0,0,0,0.08)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 30px",
      position: "fixed", // Changed from sticky to fixed
      width: "100%",
      top: 0,
      zIndex: 1000,
      borderBottom: "1px solid #f1f5f9"
    }}>
      {/* Left Section */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "25px",
        flex: 1
      }}>
        {/* Logo/Brand (Optional) */}
        <img src={logo} alt="logo" style={{width:"70px",height:"50px"}}/>
        {/* <div style={{
    fontSize: "clamp(16px, 2.5vw, 28px)", 
    fontWeight: "800",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "auto",
    whiteSpace: "nowrap", // Prevents text from stacking on mobile
    textAlign: "center"
}}>
    Find My Career
</div> */}
      {/* SearchBar here if needded */}
      </div>
      {/* Right Section - Actions */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "15px"
      }}>
        {/* Notifications */}
        <div style={{ position: "relative" }}>
<button
  onClick={() => setShowNotifications(!showNotifications)}
  style={{
    /* Dynamic width and height: scales between 36px and 48px */
    width: "clamp(36px, 8vw, 48px)",
    height: "clamp(36px, 8vw, 48px)",
    borderRadius: "clamp(10px, 2vw, 14px)",
    background: showNotifications ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" : "#f8fafc",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    position: "relative",
    flexShrink: 0 // Prevents the button from being crushed in tight navbars
  }}
>
  {/* Dynamic Icon Size */}
  <BsBell 
    size="clamp(16px, 4vw, 20px)" 
    color={showNotifications ? "white" : "#64748b"} 
    style={{ transition: "color 0.3s ease" }} 
  />

  {unreadCount > 0 && (
    <div style={{
      position: "absolute",
      /* Position scales with button size */
      top: "clamp(4px, 1.5vw, 8px)",
      right: "clamp(4px, 1.5vw, 8px)",
      /* Badge size scales down on mobile */
      width: "clamp(10px, 2.5vw, 13px)",
      height: "clamp(10px, 2.5vw, 13px)",
      borderRadius: "50%",
      background: "#ef4444",
      border: "2px solid white", // Slightly thinner border for mobile
      fontSize: "clamp(8px, 2vw, 10px)",
      fontWeight: "700",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {unreadCount}
    </div>
  )}
</button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div 
                onClick={() => setShowNotifications(false)}
                style={{
                  position: "fixed",
                  inset: 0,
                  zIndex: 999
                }} 
              />
              <div style={{
                position: "absolute",
                top: "calc(100% + 15px)",
                right: 0,
                width: "380px",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
                border: "1px solid #f1f5f9",
                zIndex: 1000,
                animation: "slideDown 0.3s ease-out"
              }}>
                {/* Header */}
                <div style={{
                  padding: "20px 25px",
                  borderBottom: "1px solid #f1f5f9",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1e293b" }}>
                    Notifications
                  </h4>
                  <span style={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    background: "#667eea15",
                    color: "#667eea",
                    borderRadius: "8px",
                    fontWeight: "600"
                  }}>
                    {unreadCount} new
                  </span>
                </div>

                {/* Notifications List */}
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: "18px 25px",
                        borderBottom: "1px solid #f8fafc",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        background: notif.unread ? "#f8fafc" : "white"
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = "#f1f5f9"}
                      onMouseOut={(e) => e.currentTarget.style.background = notif.unread ? "#f8fafc" : "white"}
                    >
                      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                        {notif.unread && (
                          <div style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "#667eea",
                            marginTop: "6px",
                            flexShrink: 0
                          }} />
                        )}
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#1e293b",
                            marginBottom: "4px"
                          }}>
                            {notif.title}
                          </div>
                          <div style={{
                            fontSize: "13px",
                            color: "#64748b",
                            marginBottom: "6px"
                          }}>
                            {notif.message}
                          </div>
                          <div style={{
                            fontSize: "12px",
                            color: "#94a3b8"
                          }}>
                            {notif.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{
                  padding: "15px 25px",
                  borderTop: "1px solid #f1f5f9",
                  textAlign: "center"
                }}>
                  <button style={{
                    background: "none",
                    border: "none",
                    color: "#667eea",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    padding: "5px",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.color = "#764ba2"}
                  onMouseOut={(e) => e.target.style.color = "#667eea"}>
                    View all notifications
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Divider */}
        <div style={{
          width: "1px",
          height: "35px",
          background: "#e2e8f0"
        }} />
{/* Profile Dropdown */}
<div style={{ 
  position: "relative",
  marginRight: "clamp(70px, 5vw, 70px)" 
}}>
  <div
    onClick={() => setShowProfileMenu(!showProfileMenu)}
    style={{
      display: "flex",
      alignItems: "center",
      /* Gap scales down on mobile */
      gap: "clamp(0px, 1.5vw, 12px)",
      padding: "clamp(4px, 1vw, 8px) clamp(6px, 1.5vw, 12px)",
      background: showProfileMenu ? "#f8fafc" : "transparent",
      borderRadius: "14px",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: showProfileMenu ? "2px solid #e2e8f0" : "2px solid transparent"
    }}
  >
    {/* Avatar Box - Scales proportionally */}
    <div style={{
      width: "clamp(32px, 7vw, 42px)",
      height: "clamp(32px, 7vw, 42px)",
      borderRadius: "12px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)",
      flexShrink: 0
    }}>
      <BsPerson size="clamp(18px, 4vw, 24px)" />
    </div>

    {/* Info Section - Hidden on small mobile screens to prevent overflow */}
    <div style={{ 
      textAlign: "left",
      /* Logic: Hide text if screen is smaller than 600px, otherwise show block */
      display: window.innerWidth < 600 ? "none" : "block" 
    }}>
      <div style={{ fontSize: "14px", fontWeight: "700", color: "#1e293b" }}>
        Admin
      </div>
      <div style={{ fontSize: "12px", color: "#64748b" }}>
        admin@findmycareer.com
      </div>
    </div>

    <BsChevronDown 
      size={14} 
      color="#64748b" 
      style={{ 
        transition: "transform 0.3s ease",
        transform: showProfileMenu ? "rotate(180deg)" : "rotate(0deg)",
        /* Also hide chevron on tiny screens if you want a minimal look */
        display: window.innerWidth < 480 ? "none" : "block"
      }} 
    />
  </div>

  {/* Dropdown Menu - Adjusted for mobile */}
  {showProfileMenu && (
    <>
      <div onClick={() => setShowProfileMenu(false)} style={{ position: "fixed", inset: 0, zIndex: 999 }} />
      <div style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        right: 0,
        /* Width scales slightly for small screens */
        width: "clamp(180px, 40vw, 240px)",
        background: "white",
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        border: "1px solid #f1f5f9",
        padding: "8px",
        zIndex: 1000,
        animation: "slideDown 0.3s ease-out"
      }}>
        {/* Mobile Info Header (Visible only when text above is hidden) */}
        {window.innerWidth < 600 && (
            <div style={{ padding: "10px", borderBottom: "1px solid #f1f5f9", marginBottom: "5px" }}>
                <div style={{ fontSize: "13px", fontWeight: "700" }}>Admin</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>admin@findmycareer.com</div>
            </div>
        )}

        <button 
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "transparent",
            border: "none",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            color: "#475569"
          }}
          onClick={() => navigate('/admin/login')}
        >
          <span style={{ color: "#ef4444" }}>🚪</span> Logout
        </button>
      </div>
    </>
  )}
</div>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </nav>
  );
};

export default AdminNavigationBar;